j3mzApp.factory('skillService', ['constService', function(constService) {
    return {
        getSkillByName1: function(skillName) {
            for (var key in skills) if (skills.hasOwnProperty(key)) {
                var skill = skills[key];
                if (skill.name == skillName) return skill;
            }
            return null;
        },
        calculateSkillHitType: function(skill, player, target) {
            // Calculate the table
            var missChance = Math.max(target.attributes.hitChance_require - player.attributes.hitChance, 0);
            var blockChance = Math.min(Math.max(target.attributes.precisionChance_require - player.attributes.precisionChance, 0), 1 - missChance);
            var criticalHitChance = Math.min(skill.getCriticalHitChance(player, target), 1 - missChance - blockChance);
            var hitChance = 1 - missChance - blockChance - criticalHitChance;
            // Roll once
            var roll = Math.random();
            if (roll < missChance) {
                return HitType.Miss;
            }
            if (roll < missChance + blockChance) {
                return HitType.Block;
            }
            if (roll < missChance + blockChance + criticalHitChance) {
                return HitType.Critical;
            }
            return HitType.Hit;
        },
        calculateSkillDamage: function(skill, avatar, target, hitType) {
            // Miss
            if (hitType == HitType.Miss) {
                return 0;
            }
            // Basic damage
            var weaponDamage = skill.getWeaponCoef(avatar, target) * skill.getWeaponDamage(avatar, target);
            var skillDamage = (skill.getSkillCoef(avatar, target) - skill.getWeaponCoef(avatar, target) / 10) * skill.getFinalAttackPower(avatar, target);
            var damage = skill.getBasicDamage(avatar, target) + weaponDamage + skillDamage;
            // Defense break
            damage = damage * (1 + skill.getDefenseBreakRate(avatar, target));
            // Crit damage
            if (hitType == HitType.Critical) {
                damage = damage * skill.getCriticalHitDamage(avatar, target);
            }
            // Block damage
            if (hitType == HitType.Block) {
                damage = damage / 4;
            }
            // Global benefit
            damage = damage * skill.getGlobalBenefit(avatar, target);
            // Target's defense
            damage = damage * (1 - skill.getTargetDefenseRate(avatar, target));
            // Response
            return damage;
        },
        getSkillByName: function(skillName) {
            switch (skillName) {
                case "三环套月":
                    return {
                        name: "三环套月",
                        type: constService.SkillType.Normal,
                        targetType: constService.SkillTargetType.Enemy,
                        cdRest: 0,
                        gcdLevel: 0,
                        mijis: {
                            active_count: 4,
                            options: [
                                {
                                    name: "穴位图残页",
                                    description: "调息时间减少0.5秒。",
                                    active: false
                                },
                                {
                                    name: '秘诀残页',
                                    description: "会心提高2%。",
                                    active: true
                                },
                                {
                                    name: '秘诀断篇',
                                    description: "会心提高3%。",
                                    active: true
                                },
                                {
                                    name: '秘诀绝章',
                                    description: "会心提高4%。",
                                    active: true
                                },
                                {
                                    name: '参悟残页',
                                    description: "伤害提高3%。",
                                    active: false
                                },
                                {
                                    name: '参悟断篇',
                                    description: "伤害提高4%。",
                                    active: false
                                },
                                {
                                    name: '参悟绝章',
                                    description: "伤害提高5%。",
                                    active: true
                                },
                                {
                                    name: '详解残页',
                                    description: "命中提高1%。",
                                    active: false
                                },
                                {
                                    name: '详解断篇',
                                    description: "命中提高2%。",
                                    active: false
                                }
                            ]
                        },
                        getColdTime: function(player, target) {
                            return 2;
                        },
                        getWeaponCoef: function(player, target) {
                            return 1.0;
                        },
                        getSkillCoef: function(player, target) {
                            return 0.925;
                        },
                        getBasicDamage: function(player, target) {
                            return constService.randBetween(123, 136);
                        },
                        getWeaponDamage: function(player, target) {
                            return constService.randBetween(player.attributes.weaponDamage_lowerLimit, player.attributes.weaponDamage_upperLimit);
                        },
                        getFinalAttackPower: function(player, target) {
                            return player.attributes.finalAttackPower + player.attributes.basicAttackPower * player.getExtraAttributes().basicAttckPowerMultiply;
                        },
                        getCriticalHitChance: function(player, target) {
                            // 奇穴：心固 + 秘籍
                            return player.attributes.criticalHitChance + player.getExtraAttributes().criticalHitChance + 0.02 + 0.03 + 0.04 + 0.1;
                        },
                        getCriticalHitDamage: function(player, target) {
                            // 奇穴：心固
                            return player.attributes.criticalHitDamage + player.getExtraAttributes().criticalHitDamage + 0.1;
                        },
                        getDefenseBreakRate: function(player, target) {
                            return player.attributes.defenseBreakLevel * (1 + player.getExtraAttributes().defenseBreakMultiply) / constService.DEFENSE_BREAK_COEF / 100;
                        },
                        getGlobalBenefit: function(player, target) {
                            // 秘籍
                            return 1.05;
                        },
                        getTargetDefenseRate: function(player, target) {
                            return target.attributes.defenseRate;
                        },
                        after: function(player, target, hitType) {
                            player.attributes.qidian = Math.min(constService.MAX_QIDIAN, player.attributes.qidian + 2);
                            // 奇穴：深埋
                            if (hitType == constService.HitType.Critical) {
                                player.attributes.qidian = Math.min(constService.MAX_QIDIAN, player.attributes.qidian + 2);
                            }
                        }
                    };
                case "三柴剑法":
                    return {
                        name: "三柴剑法",
                        type: constService.SkillType.Auto,
                        targetType: constService.SkillTargetType.Enemy,
                        cdRest: 0,
                        getColdTime: function(player, target) {
                            return 1.3125;
                        },
                        getWeaponCoef: function(player, target) {
                            return 1.2;
                        },
                        getSkillCoef: function(player, target) {
                            return 0.24;
                        },
                        getBasicDamage: function(player, target) {
                            return 0;
                        },
                        getWeaponDamage: function(player, target) {
                            return constService.randBetween(player.attributes.weaponDamage_lowerLimit, player.attributes.weaponDamage_upperLimit);
                        },
                        getFinalAttackPower: function(player, target) {
                            return player.attributes.finalAttackPower + player.attributes.basicAttackPower * player.getExtraAttributes().basicAttckPowerMultiply;
                        },
                        getCriticalHitChance: function(player, target) {
                            return player.attributes.criticalHitChance + player.getExtraAttributes().criticalHitChance;
                        },
                        getCriticalHitDamage: function(player, target) {
                            return player.attributes.criticalHitDamage + player.getExtraAttributes().criticalHitDamage;
                        },
                        getDefenseBreakRate: function(player, target) {
                            return player.attributes.defenseBreakLevel * (1 + player.getExtraAttributes().defenseBreakMultiply) / constService.DEFENSE_BREAK_COEF / 100;
                        },
                        getGlobalBenefit: function(player, target) {
                            return 1.0;
                        },
                        getTargetDefenseRate: function(player, target) {
                            return target.attributes.defenseRate;
                        },
                        after: function(player, target, hitType) {
                            // 奇穴：深埋
                            if (hitType == constService.HitType.Critical) {
                                player.attributes.qidian = Math.min(constService.MAX_QIDIAN, player.attributes.qidian + 2);
                            }
                        }
                    };
                case "无我无剑":
                    return {
                        name: "无我无剑",
                        type: constService.SkillType.Normal,
                        targetType: constService.SkillTargetType.Enemy,
                        cdRest: 0,
                        gcdLevel: 0,
                        mijis: {
                            active_count: 4,
                            options: [
                                {
                                    name: '秘诀残页',
                                    description: "会心提高2%。",
                                    active: false
                                },
                                {
                                    name: '秘诀断篇',
                                    description: "会心提高3%。",
                                    active: true
                                },
                                {
                                    name: '秘诀绝章',
                                    description: "会心提高4%。",
                                    active: true
                                },
                                {
                                    name: '参悟残页',
                                    description: "伤害提高3%。",
                                    active: false
                                },
                                {
                                    name: '参悟断篇',
                                    description: "伤害提高4%。",
                                    active: true
                                },
                                {
                                    name: '参悟绝章',
                                    description: "伤害提高5%。",
                                    active: true
                                },
                                {
                                    name: '详解残页',
                                    description: "命中提高1%。",
                                    active: false
                                },
                                {
                                    name: '详解断篇',
                                    description: "命中提高2%。",
                                    active: false
                                },
                                {
                                    name: "人偶图残页",
                                    description: "命中目标则续气半格。",
                                    active: false
                                }
                            ]
                        },
                        getColdTime: function(player, target) {
                            return 0;
                        },
                        getWeaponCoef: function(player, target) {
                            return 2.0;
                        },
                        getSkillCoef: function(player, target) {
                            var skillCoefQidian1 = 0.3376;
                            var skillCoefQidian10 = 1.63125;
                            return skillCoefQidian1 + (skillCoefQidian10 - skillCoefQidian1) / 9 * (player.attributes.qidian - 1);
                        },
                        getBasicDamage: function(player, target) {
                            var basicDamageLeftQidian1 = 22;
                            var basicDamageLeftQidian10 = 224;
                            var basicDamageLeft = basicDamageLeftQidian1 + (basicDamageLeftQidian10 - basicDamageLeftQidian1) / 9 * (player.attributes.qidian - 1);
                            var basicDamageRightQidian1 = 24;
                            var basicDamageRightQidian10 = 247;
                            var basicDamageRight = basicDamageRightQidian1 + (basicDamageRightQidian10 - basicDamageRightQidian1) / 9 * (player.attributes.qidian - 1);
                            return constService.randBetween(basicDamageLeft, basicDamageRight);
                        },
                        getWeaponDamage: function(player, target) {
                            return constService.randBetween(player.attributes.weaponDamage_lowerLimit, player.attributes.weaponDamage_upperLimit);
                        },
                        getFinalAttackPower: function(player, target) {
                            return player.attributes.finalAttackPower + player.attributes.basicAttackPower * player.getExtraAttributes().basicAttckPowerMultiply;
                        },
                        getCriticalHitChance: function(player, target) {
                            // 秘籍
                            return player.attributes.criticalHitChance + player.getExtraAttributes().criticalHitChance + 0.03 + 0.04;
                        },
                        getCriticalHitDamage: function(player, target) {
                            return player.attributes.criticalHitDamage + player.getExtraAttributes().criticalHitDamage;
                        },
                        getDefenseBreakRate: function(player, target) {
                            return player.attributes.defenseBreakLevel * (1 + player.getExtraAttributes().defenseBreakMultiply) / constService.DEFENSE_BREAK_COEF / 100;
                        },
                        getGlobalBenefit: function(player, target) {
                            // 秘籍 + 套装效果
                            return 1 + 0.09 + 0.1;
                        },
                        getTargetDefenseRate: function(player, target) {
                            return target.attributes.defenseRate;
                        },
                        after: function(player, target, hitType) {
                            player.attributes.qidian = 0;
                            // 奇穴：深埋
                            if (hitType == constService.HitType.Critical) {
                                player.attributes.qidian = Math.min(constService.MAX_QIDIAN, player.attributes.qidian + 2);
                            }
                            // 奇穴：叠刃
                            if (hitType == constService.HitType.Critical) {
                                target.addDebuff("叠刃", 1, player);
                            }
                        }
                    };
                case "融金":
                    return {
                        name: "融金",
                        type: constService.SkillType.Auto,
                        targetType: constService.SkillTargetType.Self,
                        cdRest: 0,
                        getColdTime: function(player, target) {
                            return 1;
                        },
                        after: function(player, target) {
                            player.attributes.qidian = Math.min(constService.MAX_QIDIAN, player.attributes.qidian + 1);
                        }
                    };
                case "八荒归元":
                    return {
                        name: "八荒归元",
                        type: constService.SkillType.Normal,
                        targetType: constService.SkillTargetType.Enemy,
                        cdRest: 0,
                        gcdLevel: 0,
                        mijis: {
                            active_count: 4,
                            options: [
                                {
                                    name: '穴位图残页',
                                    description: "调息时间减少1秒。",
                                    active: false
                                },
                                {
                                    name: '注解残页',
                                    description: "施展招式的消耗降低5%。",
                                    active: false
                                },
                                {
                                    name: '注解断篇',
                                    description: "施展招式的消耗降低10%。",
                                    active: false
                                },
                                {
                                    name: '参悟残页',
                                    description: "伤害提高3%。",
                                    active: true
                                },
                                {
                                    name: '参悟断篇',
                                    description: "伤害提高4%。",
                                    active: true
                                },
                                {
                                    name: '参悟绝章',
                                    description: "伤害提高5%。",
                                    active: true
                                },
                                {
                                    name: '详解残页',
                                    description: "命中提高2%。",
                                    active: false
                                },
                                {
                                    name: "人偶图残页",
                                    description: "命中目标则续气半格。",
                                    active: true
                                }
                            ]
                        },
                        getColdTime: function(player, target) {
                            return 15;
                        },
                        getWeaponCoef: function(player, target) {
                            return 2.0;
                        },
                        getSkillCoef: function(player, target) {
                            var skillCoefHP0 = 2;
                            var skillCoefHP100 = 1.1876;
                            return skillCoefHP0 + (skillCoefHP100 - skillCoefHP0) * (target.attributes.hp / target.attributes.hp_max);
                        },
                        getBasicDamage: function(player, target) {
                            var basicDamageLeftHP0 = 690;
                            var basicDamageLeftHP100 = 23;
                            var basicDamageLeft = basicDamageLeftHP0 + (basicDamageLeftHP100 - basicDamageLeftHP0) * (target.attributes.hp / target.attributes.hp_max);
                            var basicDamageRightHP0 = 760;
                            var basicDamageRightHP100 = 25;
                            var basicDamageRight = basicDamageRightHP0 + (basicDamageRightHP100 - basicDamageRightHP0) * (target.attributes.hp / target.attributes.hp_max);
                            return constService.randBetween(basicDamageLeft, basicDamageRight);
                        },
                        getWeaponDamage: function(player, target) {
                            return constService.randBetween(player.attributes.weaponDamage_lowerLimit, player.attributes.weaponDamage_upperLimit);
                        },
                        getFinalAttackPower: function(player, target) {
                            return player.attributes.finalAttackPower + player.attributes.basicAttackPower * player.getExtraAttributes().basicAttckPowerMultiply;
                        },
                        getCriticalHitChance: function(player, target) {
                            return player.attributes.criticalHitChance + player.getExtraAttributes().criticalHitChance;
                        },
                        getCriticalHitDamage: function(player, target) {
                            return player.attributes.criticalHitDamage + player.getExtraAttributes().criticalHitDamage;
                        },
                        getDefenseBreakRate: function(player, target) {
                            return player.attributes.defenseBreakLevel * (1 + player.getExtraAttributes().defenseBreakMultiply) / constService.DEFENSE_BREAK_COEF / 100;
                        },
                        getGlobalBenefit: function(player, target) {
                            // 秘籍 + 未知二段伤害
                            return 1.12 * 1.48;
                        },
                        getTargetDefenseRate: function(player, target) {
                            return target.attributes.defenseRate;
                        },
                        after: function(player, target, hitType) {
                            player.attributes.qidian = Math.min(constService.MAX_QIDIAN, player.attributes.qidian + 2);
                            // 秘籍
                            if (hitType != constService.HitType.Miss) {
                                player.attributes.qidian = Math.min(constService.MAX_QIDIAN, player.attributes.qidian + 1);
                            }
                            // 奇穴：深埋
                            if (hitType == constService.HitType.Critical) {
                                player.attributes.qidian = Math.min(constService.MAX_QIDIAN, player.attributes.qidian + 2);
                            }
                        }
                    };
                case "天地无极":
                    return {
                        name: "天地无极",
                        type: constService.SkillType.Normal,
                        targetType: constService.SkillTargetType.Enemy,
                        cdRest: 0,
                        gcdLevel: 0,
                        getColdTime: function(player, target) {
                            // 奇穴：风逝
                            return 6;
                        },
                        getWeaponCoef: function(player, target) {
                            return 0;
                        },
                        getSkillCoef: function(player, target) {
                            return 0.925;
                        },
                        getBasicDamage: function(player, target) {
                            return constService.randBetween(129, 142);
                        },
                        getWeaponDamage: function(player, target) {
                            return constService.randBetween(player.attributes.weaponDamage_lowerLimit, player.attributes.weaponDamage_upperLimit);
                        },
                        getFinalAttackPower: function(player, target) {
                            return player.attributes.finalAttackPower + player.attributes.basicAttackPower * player.getExtraAttributes().basicAttckPowerMultiply;
                        },
                        getCriticalHitChance: function(player, target) {
                            // 奇穴：风逝
                            return player.attributes.criticalHitChance + player.getExtraAttributes().criticalHitChance + 0.1;
                        },
                        getCriticalHitDamage: function(player, target) {
                            return player.attributes.criticalHitDamage + player.getExtraAttributes().criticalHitDamage;
                        },
                        getDefenseBreakRate: function(player, target) {
                            return player.attributes.defenseBreakLevel * (1 + player.getExtraAttributes().defenseBreakMultiply) / constService.DEFENSE_BREAK_COEF / 100;
                        },
                        getGlobalBenefit: function(player, target) {
                            return 1.00;
                        },
                        getTargetDefenseRate: function(player, target) {
                            return target.attributes.defenseRate;
                        },
                        after: function(player, target, hitType) {
                            player.attributes.qidian = Math.min(constService.MAX_QIDIAN, player.attributes.qidian + 2);
                            // 奇穴：无欲
                            if (hitType == HitType.Critical) {
                                player.xinfa.getSkillByName("八荒归元").cdRest = 0;
                            }
                            // 奇穴：深埋
                            if (hitType == HitType.Critical) {
                                player.attributes.qidian = Math.min(constService.MAX_QIDIAN, player.attributes.qidian + 2);
                            }
                        }
                    };
                case "碎星辰":
                    return {
                        name: "碎星辰",
                        type: constService.SkillType.Casting,
                        targetType: constService.SkillTargetType.Self,
                        cdRest: 0,
                        gcdLevel: 0,
                        getColdTime: function(player, target) {
                            return 10;
                        },
                        getCastingDuration:function(player, target) {
                            return 1;
                        },
                        after: function(player, target) {
                            player.attributes.qidian = Math.min(constService.MAX_QIDIAN, player.attributes.qidian + 2);
                            player.addBuff("碎星辰", 1);
                            // 奇穴：期声
                            player.addBuff("期声", 1);
                        }
                    };
                case "人剑合一":
                    return {
                        name: "人剑合一",
                        type: constService.SkillType.Normal,
                        targetType: constService.SkillTargetType.Enemy,
                        cdRest: 0,
                        gcdLevel: 0,
                        mijis: {
                            active_count: 4,
                            options: [
                                {
                                    name: '穴位图残页',
                                    description: "调息时间减少2秒。",
                                    active: true
                                },
                                {
                                    name: '穴位图断篇',
                                    description: "调息时间减少3秒。",
                                    active: true
                                },
                                {
                                    name: "人偶图残页",
                                    description: "招式附加额外的持续伤害，持续12秒。",
                                    active: false
                                },
                                {
                                    name: '参悟残页',
                                    description: "伤害提高40%。",
                                    active: false
                                },
                                {
                                    name: '参悟断篇',
                                    description: "伤害提高60%。",
                                    active: false
                                },
                                {
                                    name: '真传残页',
                                    description: "招式的有效距离增加1尺。",
                                    active: true
                                },
                                {
                                    name: '真传断篇',
                                    description: "招式的有效距离增加1尺。",
                                    active: true
                                },
                                {
                                    name: '真传绝章',
                                    description: "招式的有效距离增加1尺。",
                                    active: false
                                }
                            ]
                        },
                        getColdTime: function(player, target) {
                            // 秘籍
                            return 20 - 3 - 2;
                        },
                        getWeaponCoef: function(player, target) {
                            return 0;
                        },
                        getSkillCoef: function(player, target) {
                            return 0.1;
                        },
                        getBasicDamage: function(player, target) {
                            return 63;
                        },
                        getWeaponDamage: function(player, target) {
                            return constService.randBetween(player.attributes.weaponDamage_lowerLimit, player.attributes.weaponDamage_upperLimit);
                        },
                        getFinalAttackPower: function(player, target) {
                            return player.attributes.finalAttackPower + player.attributes.basicAttackPower * player.getExtraAttributes().basicAttckPowerMultiply;
                        },
                        getCriticalHitChance: function(player, target) {
                            return player.attributes.criticalHitChance + player.getExtraAttributes().criticalHitChance;
                        },
                        getCriticalHitDamage: function(player, target) {
                            return player.attributes.criticalHitDamage + player.getExtraAttributes().criticalHitDamage;
                        },
                        getDefenseBreakRate: function(player, target) {
                            return player.attributes.defenseBreakLevel * (1 + player.getExtraAttributes().defenseBreakMultiply) / constService.DEFENSE_BREAK_COEF / 100;
                        },
                        getGlobalBenefit: function(player, target) {
                            return 1.00;
                        },
                        getTargetDefenseRate: function(player, target) {
                            return target.attributes.defenseRate;
                        },
                        after: function(player, target, hitType) {
                            player.attributes.qidian = Math.min(constService.MAX_QIDIAN, player.attributes.qidian + 2);
                            // 奇穴：玄门
                            if (player.getBuffByName("碎星辰") != null) {
                                player.removeBuff("碎星辰");
                                player.addBuff("玄门");
                            }
                            // 奇穴：深埋
                            if (hitType == constService.HitType.Critical) {
                                player.attributes.qidian = Math.min(constService.MAX_QIDIAN, player.attributes.qidian + 2);
                            }
                        }
                    };
            }
        },
        getSkillsByXinfaType: function(xinfaType) {
            switch (xinfaType) {
                case constService.XinfaType.Taixujianyi:
                    return [
                        this.getSkillByName("三环套月"),
                        this.getSkillByName("三柴剑法"),
                        this.getSkillByName("无我无剑"),
                        this.getSkillByName("融金"),
                        this.getSkillByName("八荒归元"),
                        this.getSkillByName("天地无极"),
                        this.getSkillByName("碎星辰"),
                        this.getSkillByName("人剑合一")
                    ];
                case constService.XinfaType.Aoxuezhanyi:
                    return [];
            }
        }
    };
}]);