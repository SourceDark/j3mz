j3mzApp.factory('attributeService', ['constService', function(constService) {
    return {
        getAttributesByXinfaType: function(xinfaType) {
            switch (xinfaType) {
                case constService.XinfaType.Taixujianyi:
                    return {
                        weaponDamage_lowerLimit: 201,
                        weaponDamage_upperLimit: 335,
                        weaponDamage_extra: 219,
                        basicAttackPower: 2613,
                        finalAttackPower: 3886,
                        criticalHitChance: 32.7,
                        criticalHitDamage: 217.48,
                        defenseBreakLevel: 1106,
                        hitChance: 110.09,
                        precisionChance: 24.65,
                        qidian: 10
                    };
                case constService.XinfaType.Aoxuezhanyi:
                    return [];
                default:
                    return [];
            }
        }
    }
}]);