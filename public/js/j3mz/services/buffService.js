j3mzApp.factory('buffService', ['skillService', 'constService', function(skillService, constService) {
    var buffs = [
        {
            name: "碎星辰",
            duration: 0,
            duration_max: 36,
            level: 0,
            level_max: 1,
            effects: {
                criticalHitChance: 0.1,
                criticalHitDamage: 0.2
            }
        },
        {
            name: "玄门",
            duration: 0,
            duration_max: 40,
            level: 0,
            level_max: 3,
            effects: {
                criticalHitChance: 0.05,
                defenseBreakMultiply: 0.1
            }
        },
        {
            name: "期声",
            duration: 0,
            duration_max: 37,
            level: 0,
            level_max: 1,
            effects: {
                basicAttackPowerMultiply: 0.1
            }
        }
    ];
    var debuffs = [
        {
            name: "叠刃",
            duration: 0,
            duration_max: 24,
            tick_duration: 0,
            tick_duration_max: 3,
            level: 0,
            level_max: 5,
            skillCoef: 0.11675
        }
    ];
    return {
        buffs: buffs,
        getBuffByName: function(buffname) {
            for (var key in this.buffs) {
                var buff = this.buffs[key];
                if (buff.name == buffname) {
                    return buff;
                }
            }
            return null;
        },
        debuffs: debuffs,
        getDebuffByName: function(debuffName) {
            for (var key in this.debuffs) {
                var debuff = this.debuffs[key];
                if (debuff.name == debuffName) {
                    return debuff;
                }
            }
            return null;
        },
        calculateDebuffHitType: function(debuff, player, target) {
            // Calculate the table
            var blockChance = Math.max(target.attributes.precisionChance_require - debuff.attributes.precisionChance, 0);
            var criticalHitChance = Math.min(debuff.attributes.criticalHitChance, 1 - blockChance);
            var hitChance = 1 - blockChance - criticalHitChance;
            // Roll once
            var roll = Math.random();
            if (roll < blockChance) {
                return skillService.HitType.Block;
            }
            if (roll < blockChance + criticalHitChance) {
                return skillService.HitType.Critical;
            }
            return skillService.HitType.Hit;
        },
        calculateDebuffDamage: function(debuff, avatar, target, hitType) {
            // Basic damage
            var damage = debuff.skillCoef * debuff.attributes.finalAttackPower;
            // Defense break
            damage = damage * (1 + debuff.attributes.defenseBreakLevel / constService.DEFENSE_BREAK_COEF / 100);
            // Critical damage
            if (hitType == skillService.HitType.Critical) {
                damage = damage * debuff.attributes.criticalHitDamage;
            }
            // Block damage
            if (hitType == skillService.HitType.Block) {
                damage = damage / 4;
            }
            // Global benefit
            damage = damage * 1;
            // Target's defense
            damage = damage * (1 - target.attributes.defenseRate);
            // Response
            return damage;
        }
    };
}]);