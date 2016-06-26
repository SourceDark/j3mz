j3mzApp.factory('avatarService', ['macroService', 'skillService', 'constService', 'buffService', 'loggerService', 'qixueService', 'attributeService',
    function(macroService, skillService, constService, buffService, logger, qixueService, attributeService) {
        return {
            createPlayer: function() {
                var pri = {
                    xinfa: null,
                    qixues: [],
                    skills: [],
                    attributes: {}
                };
                return {
                    setXinfa: function(xinfa) {
                        pri.xinfa = xinfa;
                        pri.qixues = qixueService.getQixuesByXinfaType(xinfa.type);
                        pri.skills = skillService.getSkillsByXinfaType(xinfa.type);
                        pri.attributes = attributeService.getAttributesByXinfaType(xinfa.type);
                    },
                    getXinfa: function() {
                        return pri.xinfa;
                    },
                    getQixues: function() {
                        return pri.qixues;
                    },
                    getSkills: function() {
                        return pri.skills;
                    },
                    getAttributes: function() {
                        return pri.attributes;
                    }
                }
            },
            createTarget: function() {
                var pri = {
                    type: null,
                    attributes: {}
                };
                return {
                    setAttributes: function(attributes) {
                        pri.attributes = attributes;
                    }
                }
            },
            createPlayer1: function(xinfa, attributes) {
                return {
                    reset: function() {
                        this.buffs = [];    
                        this.gcd = [0];
                        this.xinfa.reset();
                    },
                    xinfa: xinfa,
                    attributes: {
                        weaponDamage_lowerLimit: parseInt(attributes.weaponDamage_lowerLimit) + parseInt(attributes.weaponDamage_extra),
                        weaponDamage_upperLimit: parseInt(attributes.weaponDamage_upperLimit) + parseInt(attributes.weaponDamage_extra) ,
                        basicAttackPower: parseInt(attributes.basicAttackPower),
                        finalAttackPower: parseInt(attributes.finalAttackPower),
                        criticalHitChance: attributes.criticalHitChance / 100.0,
                        criticalHitDamage: attributes.criticalHitDamage / 100.0,
                        defenseBreakLevel: parseInt(attributes.defenseBreakLevel),
                        hitChance: attributes.hitChance / 100.0,
                        precisionChance: attributes.precisionChance / 100.0,
                        qidian: 10
                    },
                    buffs: [],
                    getBuffByName: function(buffName) {
                        for (var key in this.buffs) {
                            var buff = this.buffs[key];
                            if (buff.name == buffName) {
                                return buff;
                            }
                        }
                        return null;
                    },
                    getExtraAttributes: function() {
                        var ret = {
                            criticalHitChance: 0,
                            criticalHitDamage: 0,
                            defenseBreakMultiply: 0,
                            basicAttckPowerMultiply: 0,
                        }
                        for (var key in this.buffs) {
                            var buff = this.buffs[key];
                            if (buff.effects.criticalHitChance != null) {
                                ret.criticalHitChance += buff.effects.criticalHitChance * buff.level;
                            }
                            if (buff.effects.criticalHitDamage != null) {
                                ret.criticalHitDamage += buff.effects.criticalHitDamage * buff.level;
                            }
                            if (buff.effects.defenseBreakMultiply != null) {
                                ret.defenseBreakMultiply += buff.effects.defenseBreakMultiply * buff.level;
                            }
                            if (buff.effects.basicAttckPowerMultiply != null) {
                                ret.basicAttckPowerMultiply += buff.effects.basicAttckPowerMultiply * buff.level;
                            }
                        }
                        return ret;
                    },
                    gcd: [0],
                    isCasting: false,
                    castingCountDown: 0,
                    castingSkill: null,
                    castSkill: function(target, skill) {
                        // Is player casting?
                        if (this.isCasting) return;

                        // Is gcd & cd ok?
                        if (skill.gcdLevel != null && this.gcd[skill.gcdLevel] > 0) return;
                        if (skill.cdRest > 0) return;

                        // Cast skill
                        if (skill.type == skillService.SkillType.Casting) {
                            this.isCasting = true;
                            this.castingSkill = skill;
                            this.castingCountDown = skill.getCastingDuration();
                            logger.logStartCasting(skill);
                        }
                        else {
                            this.useSkill(target, skill);
                        }

                        // Trigger GCD
                        if (skill.gcdLevel != null) {
                            this.gcd[skill.gcdLevel] = constService.calcGCD(this);
                        }
                    },
                    useSkill: function(target, skill) {
                        if (skill.targetType == skillService.SkillTargetType.Enemy) {
                            // Determine hit type
                            var hitType = skillService.calculateSkillHitType(skill, this, target);
                            // Calculate damage
                            var damage = skillService.calculateSkillDamage(skill, this, target, hitType);
                            // Log
                            logger.logDamage(skill, this, target, hitType, damage);
                            // After effect
                            skill.after(this, target, hitType);
                        }
                        else {
                            if (skill.after) {
                                skill.after(this, target, hitType);
                            }
                        }
                        // Trigger CD
                        skill.cdRest = skill.getColdTime();
                    },
                    addBuff: function(buffName, levels) {
                        var buff = this.getBuffByName(buffName);
                        if (buff == null) {
                            buff = buffService.getBuffByName(buffName);
                            this.buffs.push(buff);
                            buff.level = 0;
                        }
                        buff.duration = buff.duration_max;
                        buff.level = Math.min(buff.level + levels, buff.level_max);
                        logger.logAddPlayerBuff(buff);
                    },
                    removeBuff: function(buffName) {
                        var buffList = [];
                        for (var key in this.buffs) {
                            var buff = this.buffs[key];
                            if (buff.name != buffName) {
                                buffList.push(buff);
                            }
                        }
                        this.buffs = buffList;
                    }
                };
            },
            createTarget1: function(target) {
                return {
                    reset: function() {
                        this.debuffs = [];
                    },
                    name: target.name,
                    attributes: {
                        hp: 5000000,
                        hp_max: 5000000,
                        hitChance_require: target.attributes.hitChance_require,
                        precisionChance_require: target.attributes.precisionChance_require,
                        defenseRate: target.attributes.defenseRate
                    },
                    debuffs: [],
                    getDebuffByName: function(debuffName) {
                        for (var key in this.debuffs) {
                            var debuff = this.debuffs[key];
                            if (debuff.name == debuffName) {
                                return debuff;
                            }
                        }
                        return null;
                    },
                    addDebuff: function(debuffName, levels, player) {
                        var debuff = this.getDebuffByName(debuffName);
                        if (debuff == null) {
                            debuff = buffService.getDebuffByName(debuffName);
                            this.debuffs.push(debuff);
                            debuff.level = 0;
                            if (debuff.tick_duration_max != null) {
                                debuff.tick_duration = debuff.tick_duration_max;
                            }
                        }
                        debuff.duration = debuff.duration_max;
                        debuff.level = Math.min(debuff.level + levels, debuff.level_max);
                        if (player != null) {
                            debuff.attributes = {
                                finalAttackPower: player.attributes.finalAttackPower + player.attributes.basicAttackPower * player.getExtraAttributes().basicAttckPowerMultiply,
                                criticalHitChance: player.attributes.criticalHitChance + player.getExtraAttributes().criticalHitChance,
                                criticalHitDamage: player.attributes.criticalHitDamage + player.getExtraAttributes().criticalHitDamage,
                                defenseBreakLevel: player.attributes.defenseBreakLevel * (1 + player.getExtraAttributes().defenseBreakMultiply),
                                precisionChance: player.attributes.precisionChance
                            }
                        }
                        logger.logAddTargetDebuff(debuff, this);
                    }
                };
            }
        };
    }
]);