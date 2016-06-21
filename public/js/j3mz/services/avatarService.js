j3mzApp.factory('avatarService', ['macroService', 'skillService', function(macroService, skillService) {
    return {
        createPlayer: function(xinfa, attributes) {
            var avatar = {
                xinfa: xinfa,
                attributes: {
                    weaponDamage_lowerLimit: attributes.weaponDamage_lowerLimit + attributes.weaponDamage_extra,
                    weaponDamage_upperLimit: attributes.weaponDamage_upperLimit + attributes.weaponDamage_extra,
                    basicAttackPower: attributes.basicAttackPower,
                    finalAttackPower: attributes.finalAttackPower,
                    criticalHitChance: attributes.criticalHitChance / 100.0,
                    criticalHitDamage: attributes.criticalHitDamage / 100.0,
                    defenseBreakLevel: attributes.defenseBreakLevel,
                    hitChance: attributes.hitChance / 100.0,
                    precisionChance: attributes.precisionChance / 100.0
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
                isCasting: false,
                castingCountDown: 0,
                castingSkill: null
            };
            return avatar;
        },
        createTarget: function(target) {
            var avatar = {
                name: target.name,
                attributes: {
                    hp: 5000000,
                    hitChance_require: target.attributes.hitChance_require,
                    precisionChance_require: target.attributes.precisionChance_require,
                    defenseRate: target.attributes.defenseRate
                }
            };
            return avatar;
        },
        simulateAFrame: function(player, target, macro) {
            // try macro
            for (var key in macro) if (macro.hasOwnProperty(key)) {
                var cast = macro[key];
                if (macroService.calculateCondition(cast.condition, player, target)) {
                    this.castSkill(player, target, cast.skill);
                }
            }
        },
        castSkill: function(player, target, skillName) {
            // Is player casting?
            if (player.isCasting) return;

            // Is skill's name right?
            var skill = xinfa.getSkillByName(skillName);
            if (skill == null) return;

            // Is gcd & cd ok?
            if (skill.gcdLevel != null && player.gcd[skill.gcdLevel] > 0) return;
            if (skill.cdRest > 0) return;

            // Cast skill
            if (skill.type == skillService.SkillType.Casting) {
                player.isCasting = true;
                player.castingSkill = skill;
                player.castingCountDown = skill.getCastingDuration();
            }
            else {
                this.useSkill(player, target, skill);
            }

            // Trigger GCD
            if (skill.gcdLevel != null) {
                this.gcds[skill.gcdLevel] = 1.5;
            }
        },
        useSkill: function(player, target, skill) {

        }
    };
}]);