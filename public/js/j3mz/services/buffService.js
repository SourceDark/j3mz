j3mzApp.factory('buffService', function() {
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
            skillCoef: 0.1163
        }
    ]
    return {
        buffs: buffs,
        debuffs: buffs
    };
});