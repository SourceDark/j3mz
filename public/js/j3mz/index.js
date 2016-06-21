j3mzApp.controller('indexCtrl', ['$scope', 'worldService', 'xinfaService', 'avatarService', 'constService',
    'macroService',
    function($scope, worldService, xinfaService, avatarService, constService, macroService) {
        /**
         * Parameters needed to input
         */
        $scope.xinfas = xinfaService.xinfas;
        $scope.xinfa = $scope.xinfas[0];
        $scope.attributes = {
            weaponDamage_lowerLimit: 201,
            weaponDamage_upperLimit: 335,
            weaponDamage_extra: 219,
            basicAttackPower: 2613,
            finalAttackPower: 3886,
            criticalHitChance: 32.7,
            criticalHitDamage: 217.48,
            defenseBreakLevel: 1106,
            hitChance: 110.09,
            precisionChance: 24.65
        };
        $scope.targets = constService.targets;
        $scope.target = $scope.targets[2];
        $scope.macroText =
            "/cast [qidian>7] 无我无剑\n" +
            "/cast [bufftime:玄门<5|buff:玄门<3] 人剑合一\n" +
            "/cast [nobuff:碎星辰] 碎星辰\n" +
            "/cast 八荒归元\n" +
            "/cast 天地无极\n" +
            "/cast 三环套月\n";
        $scope.frameLength = 0.01;
        $scope.worldLength = 10;
        $scope.worldAmount = 1;

        $scope.test = function() {
            var dpsSum = 0;
            for (var i = 0; i < $scope.worldAmount; i++) {
                var player = avatarService.createPlayer($scope.xinfa, $scope.attributes);
                var target = avatarService.createTarget($scope.target);
                var macro = macroService.createMacro($scope.macroText);
                var world = worldService.createWorld(player, target, macro, $scope.frameLength, $scope.worldLength);
                world.simulate();
            }
        };
    }
]);