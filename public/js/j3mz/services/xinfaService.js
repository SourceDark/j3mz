j3mzApp.factory('xinfaService', ['skillService', function(skillService) {
    var xinfas = [
        {
            name: '太虚剑意',
            pinyin: 'taixujianyi',
            description: [
                '剑锋乍现虚难辨',
                '御风而行缥缈踪',
                '手中无剑心无我',
                '人剑合一 势无不破'
            ],
            useWeapon: true,
            skills: [
                skillService.getSkillByName("三环套月"),
                skillService.getSkillByName("三柴剑法"),
                skillService.getSkillByName("无我无剑"),
                skillService.getSkillByName("被动回豆"),
                skillService.getSkillByName("八荒归元"),
                skillService.getSkillByName("天地无极"),
                skillService.getSkillByName("碎星辰")
            ],
            qixues: [
                {
                    active: 1,
                    options: [
                        {
                            name: "挫锐",
                            description: "“三环套月”伤害提高10%",
                            available: true,
                            active: false
                        },
                        {
                            name: "心固",
                            description: "“三环套月会心提高10%，会效效果提高10%",
                            available: true,
                            active: true
                        },
                        {
                            name: "凝神聚气",
                            description: "凝神聚气",
                            available: false,
                            active: false
                        }
                    ]
                },
                {
                    active: 1,
                    options: [
                        {
                            name: "同根",
                            description: "“无我无剑”“万剑归总”的伤害提高10%",
                            available: true,
                            active: false
                        },
                        {
                            name: "深埋",
                            description: "外功招式会心后，自身立即回复一格气",
                            available: true,
                            active: true
                        },
                        {
                            name: "吐故纳新",
                            description: "吐故纳新",
                            available: false,
                            active: false
                        }
                    ]
                },
                {
                    active: 3,
                    options: [
                        {
                            name: "昆吾",
                            description: "昆吾",
                            available: false,
                            active: false
                        },
                        {
                            name: "白虹",
                            description: "白虹",
                            available: false,
                            active: false
                        },
                        {
                            name: "数穷",
                            description: "数穷",
                            available: false,
                            active: false
                        },
                        {
                            name: "碎星辰",
                            description: "产生一个10尺的气场，范围内所有团队成员外功会心几率提高5%，外功会心效果提高10%，持续24秒",
                            available: false,
                            active: false
                        }
                    ]
                }
            ]
        },
        {
            name: '紫霞功',
            pinyin: 'zixiagong',
            useWeapon: false
        },
        {
            description: [
                '枪划九天势破风',
                '龙穿入云裂长空',
                '浅水亦有龙低吟',
                '龙牙出时天下红'
            ],
            name: '傲血战意',
            pinyin: 'aoxuezhanyi',
            useWeapon: true
        },
        {
            name: '惊羽诀',
            pinyin: 'jingyujue',
            useWeapon: true
        },
        {
            name: '冰心诀',
            pinyin: 'bingxinjue',
            useWeapon: false
        },
        {
            name: '花间游',
            pinyin: 'huajianyou',
            useWeapon: false
        },
        {
            name: '天罗诡道',
            pinyin: 'tianluoguidao',
            useWeapon: false
        },
        {
            name: '易筋经',
            pinyin: 'yijinjing',
            useWeapon: false
        },
        {
            name: '毒经',
            pinyin: 'dujing',
            useWeapon: false
        },
        {
            name: '焚影圣决',
            pinyin: 'fenyingshengjue',
            useWeapon: false
        }
    ];
    for (var key in xinfas) if (xinfas.hasOwnProperty(key)) {
        var xinfa = xinfas[key];
        xinfa.getSkillByName = function(skillName) {
            for (var key in this.skills) if (this.skills.hasOwnProperty(key)) {
                var skill = this.skills[key];
                if (skill.name == skillName) {
                    return skill;
                }
            }
            return null;
        };
        xinfa.reset = function() {
            for (var key in this.skills) if (this.skills.hasOwnProperty(key)) {
                var skill = this.skills[key];
                skill.reset();
            }
        }
    }
    return {
        xinfas: xinfas,
        getXinfaByName: function(xinfaName) {
            for (var key in xinfas) if (xinfas.hasOwnProperty(key)) {
                var xinfa = xinfas[key];
                if (xinfa.name == xinfaName) {
                    return xinfa;
                }
            }
        }
    };
}]);