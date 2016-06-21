j3mzApp.factory('skillService', ['constService', function(constService) {
    var SkillType = {
        Normal: 0,
        Auto: 1,
        Casting: 2
    };
    var SkillTargetType = {
        Enemy: 0,
        Self: 1
    };
    var HitType = {
        Miss: 0,
        Hit: 1,
        Critical: 2,
        Block: 3
    };
    var skills = [
        {
            name: "三环套月",
            type: SkillType.Normal,
            targetType: SkillTargetType.Enemy,
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
                player.attributes.qidian = Math.min(constService.MAX_QIDIAN, player.attributes.qidian + 2);
                // 奇穴：深埋
                if (hitType == HitType.Critical) {
                    player.attributes.qidian = Math.min(constService.MAX_QIDIAN, player.attributes.qidian + 2);
                }
            }
        },
        {
            name: "三柴剑法",
            type: SkillType.Auto,
            targetType: SkillTargetType.Enemy,
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
                if (hitType == HitType.Critical) {
                    player.attributes.qidian = Math.min(constService.MAX_QIDIAN, player.attributes.qidian + 2);
                }
            }
        },
        {
            name: "无我无剑",
            type: SkillType.Normal,
            targetType: SkillTargetType.Enemy,
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
                if (hitType == HitType.Critical) {
                    player.attributes.qidian = Math.min(constService.MAX_QIDIAN, player.attributes.qidian + 2);
                }
                // 奇穴：叠刃
                if (hitType == HitType.Critical) {
                    target.addDebuff("叠刃", 1, player);
                }
            }
        },
        {
            name: "被动回豆",
            type: SkillType.Auto,
            targetType: SkillTargetType.Self,
            cdRest: 0,
            getColdTime: function(player, target) {
                return 1;
            },
            after: function(player, target) {
                player.attributes.qidian = Math.min(constService.MAX_QIDIAN, player.attributes.qidian + 1);
            }
        },
        {
            name: "八荒归元",
            type: SkillType.Normal,
            targetType: SkillTargetType.Enemy,
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
                if (hitType != HitType.Miss) {
                    player.attributes.qidian = Math.min(constService.MAX_QIDIAN, player.attributes.qidian + 1);
                }
                // 奇穴：深埋
                if (hitType == HitType.Critical) {
                    player.attributes.qidian = Math.min(constService.MAX_QIDIAN, player.attributes.qidian + 2);
                }
            }
        },
        {
            name: "天地无极",
            type: SkillType.Normal,
            targetType: SkillTargetType.Enemy,
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
        },
        {
            name: "碎星辰",
            type: SkillType.Casting,
            targetType: SkillTargetType.Self,
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
        },
        {
            name: "人剑合一",
            type: SkillType.Normal,
            targetType: SkillTargetType.Enemy,
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
                if (hitType == HitType.Critical) {
                    player.attributes.qidian = Math.min(constService.MAX_QIDIAN, player.attributes.qidian + 2);
                }
            }
        }
    ];
    for (var key in skills) if (skills.hasOwnProperty(key)) {
        var skill = skills[key];
        skill.reset = function() {
            this.cdRest = 0;
        }
    }
    return {
        SkillType: SkillType,
        SkillTargetType: SkillTargetType,
        HitType: HitType,
        getSkillByName: function(skillName) {
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
        }
    };
}]);