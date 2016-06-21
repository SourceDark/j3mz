j3mzApp.factory('macroService', function() {
    var ConditionNodeType = {
        Smaller: 0,
        Greater: 1,
        Qidian: 2,
        Number: 3,
        And: 4,
        Or: 5,
        NoBuff: 6,
        BuffTime: 7,
        BuffExist: 8,
        BuffLevel: 9
    };

    function parseConditionText(conditionText, fatherType) {
        if (conditionText == null) {
            return null;
        }
        if (conditionText.indexOf('&') != -1) {
            return {
                type: ConditionNodeType.And,
                left: parseConditionText(conditionText.substring(0, conditionText.indexOf('&')), ConditionNodeType.Or),
                right: parseConditionText(conditionText.substring(conditionText.indexOf('&') + 1, conditionText.length), ConditionNodeType.Or)
            }
        }
        if (conditionText.indexOf('|') != -1) {
            return {
                type: ConditionNodeType.Or,
                left: parseConditionText(conditionText.substring(0, conditionText.indexOf('|')), ConditionNodeType.Or),
                right: parseConditionText(conditionText.substring(conditionText.indexOf('|') + 1, conditionText.length), ConditionNodeType.Or)
            }
        }
        if (conditionText.indexOf('>') != -1) {
            return {
                type: ConditionNodeType.Greater,
                left: parseConditionText(conditionText.substring(0, conditionText.indexOf('>')), ConditionNodeType.Greater),
                right: parseConditionText(conditionText.substring(conditionText.indexOf('>') + 1, conditionText.length), ConditionNodeType.Greater)
            }
        }
        if (conditionText.indexOf('<') != -1) {
            return {
                type: ConditionNodeType.Smaller,
                left: parseConditionText(conditionText.substring(0, conditionText.indexOf('<')), ConditionNodeType.Smaller),
                right: parseConditionText(conditionText.substring(conditionText.indexOf('<') + 1, conditionText.length), ConditionNodeType.Smaller)
            }
        }
        if (conditionText == "qidian") {
            return {
                type: ConditionNodeType.Qidian
            }
        }
        if (conditionText.indexOf(':') != -1) {
            var leftText = conditionText.substring(0, conditionText.indexOf(':'));
            var rightText = conditionText.substring(conditionText.indexOf(':') + 1, conditionText.length);
            if (leftText == "nobuff") {
                return {
                    type: ConditionNodeType.NoBuff,
                    buffname: rightText
                }
            }
            if (leftText == "bufftime") {
                return {
                    type: ConditionNodeType.BuffTime,
                    buffname: rightText
                }
            }
            if (leftText == "buff") {
                if (fatherType == ConditionNodeType.Greater || fatherType == ConditionNodeType.Smaller) {
                    return {
                        type: ConditionNodeType.BuffLevel,
                        buffname: rightText
                    }
                }
                else {
                    return {
                        type: ConditionNodeType.BuffExist,
                        buffname: rightText
                    }
                }
            }
        }
        return {
            type: ConditionNodeType.Number,
            value: parseInt(conditionText)
        }
    }

    return {
        createMacro: function(macroText) {
            macroText = macroText.replace(/\n/g, "");
            macroText = macroText.replace(/ /g, "");
            var orderTexts = macroText.split("/cast");
            var macro = [];
            for (var key in orderTexts) {
                var orderText = orderTexts[key];
                var lbra = orderText.indexOf('[');
                var rbra = orderText.indexOf(']');
                var conditionText = null;
                if (lbra != -1 && rbra != -1) {
                    conditionText = orderText.substring(lbra + 1, rbra);
                }
                orderText = orderText.substring(rbra + 1, orderText.length);
                if (orderText.length > 0) {
                    macro.push({
                        condition: parseConditionText(conditionText, null),
                        skill: orderText
                    });
                }
            }
            return macro;
        },
        calculateCondition: function(condition, player, target) {
            if (condition == null) return true;
            if (condition.type == ConditionNodeType.Number) {
                return condition.value;
            }
            if (condition.type == ConditionNodeType.Qidian) {
                return player.attributes.qidian;
            }
            if (condition.type == ConditionNodeType.Greater) {
                return this.calculateCondition(condition.left, player, target) > this.calculateCondition(condition.right, player, target);
            }
            if (condition.type == ConditionNodeType.Smaller) {
                return this.calculateCondition(condition.left, player, target) < this.calculateCondition(condition.right, player, target);
            }
            if (condition.type == ConditionNodeType.And) {
                return this.calculateCondition(condition.left, player, target) && this.calculateCondition(condition.right, player, target);
            }
            if (condition.type == ConditionNodeType.Or) {
                return this.calculateCondition(condition.left, player, target) || this.calculateCondition(condition.right, player, target);
            }
            if (condition.type == ConditionNodeType.NoBuff) {
                return (player.getBuffByName(condition.buffname) == null);
            }
            if (condition.type == ConditionNodeType.BuffTime) {
                if (player.getBuffByName(condition.buffname) == null) {
                    return 0;
                }
                else {
                    return player.getBuffByName(condition.buffname).duration;
                }
            }
            if (condition.type == ConditionNodeType.BuffExist) {
                return (player.getBuffByName(condition.buffname) != null);
            }
            if (condition.type == ConditionNodeType.BuffLevel) {
                if (player.getBuffByName(condition.buffname) == null) {
                    return 0;
                }
                else {
                    return player.getBuffByName(condition.buffname).level;
                }
            }
            return true;
        }
    };
});