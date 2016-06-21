j3mzApp.factory('skillService', ['constService', function(constService) {
    var skills = [
        {
            name: "三环套月",
            type: constService.SkillType.Normal,
            targetType: constService.SkillTargetType.Enemy,
            cdRest: 0,
            gcdLevel: 0,
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
                player.attributes.qidian = Math.min(MAX_QIDIAN, player.attributes.qidian + 2);
                // 奇穴：深埋
                if (hitType == HitType.Critical) {
                    player.attributes.qidian = Math.min(MAX_QIDIAN, player.attributes.qidian + 2);
                }
            }
        },
        {
            name: "三柴剑法",
            type: constService.SkillType.Auto,
            target: constService.SkillTargetType.Enemy,
            cdRest: 0,
            getColdTime: function(player, target) {
                return 1.3125;
            },
            getWeaponCoef: function(player, target) {
                return 1.2;
            },
            getSkillCoef: function(player, target) {
                return 0.1572265625;
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
                return player.attributes.defenseBreakLevel * (1 + player.getExtraAttributes().defenseBreakMultiply) / DEFENSE_BREAK_COEF / 100;
            },
            getGlobalBenefit: function(player, target) {
                return 1.0;
            },
            getTargetDefenseRate: function(player, target) {
                return target.attributes.defenseRate;
            },
            after: function(player, target, hitType) {
                // 奇穴：深埋
                if (hitType == HitType.Critical) {
                    player.attributes.qidian = Math.min(MAX_QIDIAN, player.attributes.qidian + 2);
                }
            }
        },
        {
            name: "无我无剑",
            type: constService.SkillType.Normal,
            target: constService.SkillTargetType.Enemy,
            cdRest: 0,
            gcdLevel: 0,
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
                return randBetween(basicDamageLeft, basicDamageRight);
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
                return player.attributes.defenseBreakLevel * (1 + player.getExtraAttributes().defenseBreakMultiply) / DEFENSE_BREAK_COEF / 100;
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
                if (hitType == HitType.Critical) {
                    player.attributes.qidian = Math.min(MAX_QIDIAN, player.attributes.qidian + 2);
                }
                // 奇穴：叠刃
                if (hitType == HitType.Critical) {
                    target.addBuff("叠刃", 1, player);
                }
            }
        },
        {
            type: SkillType.Auto,
            name: "被动回豆",
            target: SkillTarget.Self,
            cdRest: 0,
            getColdTime: function(player, target) {
                return 1;
            },
            after: function(player, target) {
                player.attributes.qidian = Math.min(MAX_QIDIAN, player.attributes.qidian + 1);
            }
        },
        {
            type: SkillType.Normal,
            name: "八荒归元",
            target: SkillTarget.Enemy,
            cdRest: 0,
            gcdLevel: 0,
            getColdTime: function(player, target) {
                return 15;
            },
            getWeaponCoef: function(player, target) {
                return 2.0;
            },
            getSkillCoef: function(player, target) {
                var skillCoefHP0 = 2;
                var skillCoefHP100 = 1.1876;
                return skillCoefHP0 + (skillCoefHP100 - skillCoefHP0) * (target.attributes.currentHp / target.attributes.hp);
            },
            getBasicDamage: function(player, target) {
                var basicDamageLeftHP0 = 690;
                var basicDamageLeftHP100 = 23;
                var basicDamageLeft = basicDamageLeftHP0 + (basicDamageLeftHP100 - basicDamageLeftHP0) * (target.attributes.currentHp / target.attributes.hp);
                var basicDamageRightHP0 = 760;
                var basicDamageRightHP100 = 25;
                var basicDamageRight = basicDamageRightHP0 + (basicDamageRightHP100 - basicDamageRightHP0) * (target.attributes.currentHp / target.attributes.hp);
                return randBetween(basicDamageLeft, basicDamageRight);
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
                return player.attributes.defenseBreakLevel * (1 + player.getExtraAttributes().defenseBreakMultiply) / DEFENSE_BREAK_COEF / 100;
            },
            getGlobalBenefit: function(player, target) {
                // 秘籍 + 未知二段伤害
                return 1.12 * 1.48;
            },
            getTargetDefenseRate: function(player, target) {
                return target.attributes.defenseRate;
            },
            after: function(player, target, hitType) {
                player.attributes.qidian = Math.min(MAX_QIDIAN, player.attributes.qidian + 2);
                // 秘籍
                if (hitType != HitType.Miss) {
                    player.attributes.qidian = Math.min(MAX_QIDIAN, player.attributes.qidian + 1);
                }
                // 奇穴：深埋
                if (hitType == HitType.Critical) {
                    player.attributes.qidian = Math.min(MAX_QIDIAN, player.attributes.qidian + 2);
                }
            }
        },
        {
            type: SkillType.Normal,
            name: "天地无极",
            target: SkillTarget.Enemy,
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
                return randBetween(129, 142);
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
                return player.attributes.defenseBreakLevel * (1 + player.getExtraAttributes().defenseBreakMultiply) / DEFENSE_BREAK_COEF / 100;
            },
            getGlobalBenefit: function(player, target) {
                return 1.00;
            },
            getTargetDefenseRate: function(player, target) {
                return target.attributes.defenseRate;
            },
            after: function(player, target, hitType) {
                player.attributes.qidian = Math.min(MAX_QIDIAN, player.attributes.qidian + 2);
                // 奇穴：无欲
                if (hitType == HitType.Critical) {
                    SkillFactory.getSkillByName("八荒归元").cdRest = 0;
                }
                // 奇穴：深埋
                if (hitType == HitType.Critical) {
                    player.attributes.qidian = Math.min(MAX_QIDIAN, player.attributes.qidian + 2);
                }
            }
        },
        {
            type: SkillType.Casting,
            name: "碎星辰",
            target: SkillTarget.Self,
            cdRest: 0,
            gcdLevel: 0,
            getColdTime: function(player, target) {
                return 10;
            },
            getCastingDuration:function(player, target) {
                return 1;
            },
            after: function(player, target) {
                player.attributes.qidian = Math.min(MAX_QIDIAN, player.attributes.qidian + 2);
                player.addBuff("碎星辰");
                // 奇穴：期声
                player.addBuff("期声");
            }
        },
        {
            type: SkillType.Normal,
            name: "人剑合一",
            target: SkillTarget.Enemy,
            cdRest: 0,
            gcdLevel: 0,
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
                return player.attributes.defenseBreakLevel * (1 + player.getExtraAttributes().defenseBreakMultiply) / DEFENSE_BREAK_COEF / 100;
            },
            getGlobalBenefit: function(player, target) {
                return 1.00;
            },
            getTargetDefenseRate: function(player, target) {
                return target.attributes.defenseRate;
            },
            after: function(player, target, hitType) {
                player.attributes.qidian = Math.min(MAX_QIDIAN, player.attributes.qidian + 2);
                // 奇穴：玄门
                if (player.getBuffByName("碎星辰") != null) {
                    player.removeBuff("碎星辰");
                    player.addBuff("玄门");
                }
                // 奇穴：深埋
                if (hitType == HitType.Critical) {
                    player.attributes.qidian = Math.min(MAX_QIDIAN, player.attributes.qidian + 2);
                }
            }
        }
    ];
    return {
        getSkillByName: function(skillName) {
            for (var key in skills) if (skills.hasOwnProperty(key)) {
                var skill = skills[key];
                if (skill.name == skillName) return skill;
            }
            return null;
        }
    };
}]);