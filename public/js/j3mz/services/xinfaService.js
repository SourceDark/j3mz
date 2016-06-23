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
                            description: "“三环套月”伤害提高10%。",
                            available: true
                        },
                        {
                            name: "心固",
                            description: "“三环套月”会心提高10%，会效效果提高10%。",
                            available: true
                        },
                        {
                            name: "凝神聚气",
                            description: "凝神聚气",
                            available: false
                        }
                    ]
                },
                {
                    active: 1,
                    options: [
                        {
                            name: "同根",
                            description: "“无我无剑”“万剑归宗”的伤害提高10%。",
                            available: true
                        },
                        {
                            name: "深埋",
                            description: "外功招式会心后，自身立即回复一格气。",
                            available: true
                        },
                        {
                            name: "吐故纳新",
                            description: "吐故纳新",
                            available: false
                        }
                    ]
                },
                {
                    active: 3,
                    options: [
                        {
                            name: "昆吾",
                            description: "昆吾",
                            available: false
                        },
                        {
                            name: "白虹",
                            description: "白虹",
                            available: false
                        },
                        {
                            name: "数穷",
                            description: "数穷",
                            available: false
                        },
                        {
                            name: "碎星辰",
                            description: "产生一个10尺的气场，范围内所有团队成员外功会心几率提高5%，外功会心效果提高10%，持续24秒。",
                            available: true
                        }
                    ]
                },
                {
                    active: 0,
                    options: [
                        {
                            name: "风逝",
                            description: "“天地无极”的调息时间降低2秒，会心率提高10%。",
                            available: true
                        },
                        {
                            name: "无意",
                            description: "消耗5格气施展无我无剑，会心几率提高10%，会心效果提高10%。",
                            available: false
                        },
                        {
                            name: "元剑",
                            description: "“八荒归元”的会心提高10%，会心效果提高10%。",
                            available: false
                        },
                        {
                            name: "碎星辰",
                            description: "产生一个10尺的气场，范围内所有团队成员外功会心几率提高5%，外功会心效果提高10%，持续24秒。",
                            available: false
                        }
                    ]
                },
                {
                    active: 0,
                    options: [
                        {
                            name: "心极",
                            description: "“天地无极”命中目标后附带叠刃效果，每3秒收到一次外功伤害，持续24秒，最多叠加5层。",
                            available: true
                        },
                        {
                            name: "霜锋",
                            description: "消耗5格气施展无我无剑，会心几率提高10%，会心效果提高10%。",
                            available: false
                        },
                        {
                            name: "狂歌",
                            description: "“人剑合一”每引爆一个气场，自身回复1格气，并为自身和小队成员回复5%内力和1%气血。",
                            available: false
                        },
                        {
                            name: "抱元守缺",
                            description: "需聚气，每格气回复12%的内力最大值。",
                            available: false
                        }
                    ]
                },
                {
                    active: 2,
                    options: [
                        {
                            name: "解牛",
                            description: "解牛",
                            available: false
                        },
                        {
                            name: "解纷",
                            description: "解纷",
                            available: false
                        },
                        {
                            name: "叠刃",
                            description: "“无我无间”会心后附带1层叠刃效果，每3秒收到一次外功伤害，持续24秒，最多叠加5层。",
                            available: true
                        },
                        {
                            name: "开兑",
                            description: "开兑",
                            available: false
                        }
                    ]
                },
                {
                    active: 0,
                    options: [
                        {
                            name: "切玉",
                            description: "“八荒归元”命中40%气血以下目标，能够使“叠刃”的持续伤害立即生效。",
                            available: true
                        },
                        {
                            name: "雾外江山",
                            description: "雾外江山",
                            available: false
                        },
                        {
                            name: "云凌",
                            description: "云凌",
                            available: false
                        },
                        {
                            name: "凌太虚",
                            description: "产生一个10尺的气场，范围内所有团队成员受外功伤害降低10%，持续24秒。",
                            available: true
                        }
                    ]
                },
                {
                    active: 2,
                    options: [
                        {
                            name: "匣中",
                            description: "匣中",
                            available: false
                        },
                        {
                            name: "无我",
                            description: "无我",
                            available: false
                        },
                        {
                            name: "无欲",
                            description: "“天地无极”会心后立刻重置“八荒归元”调息时间。",
                            available: true
                        },
                        {
                            name: "化三清",
                            description: "化三清",
                            available: false
                        }
                    ]
                },
                {
                    active: 0,
                    options: [
                        {
                            name: "和光",
                            description: "“八荒归元”命中有自身“叠刃”效果目标，额外造成25%伤害效果。",
                            available: true
                        },
                        {
                            name: "实腹",
                            description: "实腹",
                            available: false
                        },
                        {
                            name: "持而盈",
                            description: "持而盈",
                            available: false
                        },
                        {
                            name: "随物",
                            description: "随物",
                            available: false
                        }
                    ]
                },
                {
                    active: 0,
                    options: [
                        {
                            name: "期声",
                            description: "位于增益气场中自身混元内功和外功基础攻击提高10%",
                            available: true
                        },
                        {
                            name: "物我两忘",
                            description: "物我两忘",
                            available: false
                        },
                        {
                            name: "独笑",
                            description: "独笑",
                            available: false
                        },
                        {
                            name: "心剑两望",
                            description: "心剑两望",
                            available: false
                        }
                    ]
                },
                {
                    active: 0,
                    options: [
                        {
                            name: "负阴",
                            description: "“碎星辰”“凌太虚”“化三清”气场持续时间增加12秒，对自身的增益效果提高100%",
                            available: true
                        },
                        {
                            name: "凶年",
                            description: "凶年",
                            available: false
                        },
                        {
                            name: "静笃",
                            description: "静笃",
                            available: false
                        },
                        {
                            name: "虚极",
                            description: "虚极",
                            available: false
                        }
                    ]
                },
                {
                    active: 2,
                    options: [
                        {
                            name: "若水",
                            description: "若水",
                            available: false
                        },
                        {
                            name: "固本",
                            description: "固本",
                            available: false
                        },
                        {
                            name: "玄门",
                            description: "“生太极”调息时间增加15秒，“人剑合一”只能引爆自身气场，每引爆一个气场，破防等级提高10%，外功会心提高5%，持续40秒，可叠加3层。",
                            available: true
                        },
                        {
                            name: "道极承天",
                            description: "道极承天",
                            available: false
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