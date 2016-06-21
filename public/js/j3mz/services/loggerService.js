j3mzApp.factory('loggerService', function() {
    var EventType = {
        DirectDamage: 0,
        RemoveTargetDebuff: 1,
        AddTargetDebuff: 2,
        DebuffDamage: 3,
        AddPlayerBuff: 4,
        StartCasting: 5,
    };
    return {
        EventType: EventType,
        time: 0,
        events: [],
        reset: function() {
            this.time = 0;
            this.events = [];
        },
        logDamage: function(skill, player, target, hitType, damage) {
            this.events.push({
                time: this.time,
                type: EventType.DirectDamage,
                skillName: skill.name,
                hitType: hitType,
                damage: damage,
                targetName: target.name
            });
        },
        logDebuffDamage: function(debuff, player, target, hitType, damage) {
            this.events.push({
                time: this.time,
                type: EventType.DebuffDamage,
                debuffName: debuff.name,
                debuffLevel: debuff.level,
                hitType: hitType,
                damage: damage,
                targetName: target.name
            });
        },
        logRemoveTargetDebuff: function(debuff, target) {
            this.events.push({
                time: this.time,
                type: EventType.RemoveTargetDebuff,
                debuffName: debuff.name,
                debuffLevel: debuff.level,
                targetName: target.name
            })
        },
        logAddTargetDebuff: function(debuff, target) {
            this.events.push({
                time: this.time,
                type: EventType.AddTargetDebuff,
                debuffName: debuff.name,
                debuffLevel: debuff.level,
                targetName: target.name
            })
        },
        logAddPlayerBuff: function(buff) {
            this.events.push({
                time: this.time,
                type: EventType.AddPlayerBuff,
                buffName: buff.name,
                buffLevel: buff.level
            })
        },
        logStartCasting: function(skill) {
            this.events.push({
                time: this.time,
                type: EventType.StartCasting,
                skillName: skill.name,
            })
        }
    };
});