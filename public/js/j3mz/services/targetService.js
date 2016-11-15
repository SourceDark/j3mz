j3mzApp.factory('targetService', ['constService', function(constService) {
    return {
        getTargetTypes: function() {
            return [
                {
                    name: "初级试炼木桩",
                    type: constService.TargetType.MuzhuangLevel0,
                    attributes: {
                        hitChance_require: 1.025,
                        precisionChance_require: 0.15,
                        defenseRate: 0.15
                    }
                },
                {
                    name: "中级试炼木桩",
                    type: constService.TargetType.MuzhuangLevel1,
                    attributes: {
                        hitChance_require: 1.05,
                        precisionChance_require: 0.20,
                        defenseRate: 0.25
                    }
                },
                {
                    name: "高级试炼木桩",
                    type: constService.TargetType.MuzhuangLevel2,
                    attributes: {
                        hitChance_require: 1.1,
                        precisionChance_require: 0.30,
                        defenseRate: 0.35
                    }
                },
                {
                    name: "极级试炼木桩",
                    type: constService.TargetType.MuzhuangLevel3,
                    attributes: {
                        hitChance_require: 1.15,
                        precisionChance_require: 0.40,
                        defenseRate: 0.40
                    }
                }
            ];
        }
    };
}]);