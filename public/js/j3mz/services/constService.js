j3mzApp.factory('constService', function() {
    return {
        DEFENSE_BREAK_COEF : 36.34,
        MAX_QIDIAN: 10,
        MIN_NUMBER: -1,
        MAX_NUMBER: 100000000,
        targets: [
            {
                name: "初级试炼木桩",
                attributes: {
                    hitChance_require: 1.025,
                    precisionChance_require: 0.15,
                    defenseRate: 0.15
                }
            },
            {
                name: "中级试炼木桩",
                attributes: {
                    hitChance_require: 1.05,
                    precisionChance_require: 0.20,
                    defenseRate: 0.25
                }
            },
            {
                name: "高级试炼木桩",
                attributes: {
                    hitChance_require: 1.1,
                    precisionChance_require: 0.30,
                    defenseRate: 0.35
                }
            },
            {
                name: "极级试炼木桩",
                attributes: {
                    hitChance_require: 1.15,
                    precisionChance_require: 0.40,
                    defenseRate: 0.40
                }
            }
        ],
        randBetween: function(a, b) {
            return a + (b - a) * Math.random();
        },
        calcGCD: function(player) {
            return 1.51;
        },
        // Types
        SkillType: {
            Normal: 0,
            Auto: 1,
            Casting: 2
        },
        SkillTargetType: {
            Enemy: 0,
            Self: 1
        },
        HitType: {
            Miss: 0,
            Hit: 1,
            Critical: 2,
            Block: 3
        },
        XinfaType: {
            Taixujianyi: 0,
            Aoxuezhanyi: 1
        },
        TargetType: {
            MuzhuangLevel0: 0,
            MuzhuangLevel1: 1,
            MuzhuangLevel2: 2,
            MuzhuangLevel3: 3
        }
    };
});