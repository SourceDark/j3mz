j3mzApp.factory('xinfaService', ['skillService', function(skillService) {
    var xinfas = [
        {
            name: '太虚剑意',
            useWeapon: true,
            skills: [
                skillService.getSkillByName("三环套月"),
                skillService.getSkillByName("三柴剑法"),
                skillService.getSkillByName("无我无剑"),
                skillService.getSkillByName("被动回豆"),
                skillService.getSkillByName("八荒归元"),
                skillService.getSkillByName("天地无极"),
                skillService.getSkillByName("碎星辰")
            ]
        }/*,
        {
            name: '紫霞功',
            useWeapon: false
        }*/
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