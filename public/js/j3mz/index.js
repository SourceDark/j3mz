j3mzApp.controller('indexCtrl', ['$scope', 'worldService', 'xinfaService', 'avatarService', 'constService', 'macroService', 'loggerService', 'skillService',
    function($scope, worldService, xinfaService, avatarService, constService, macroService, loggerService, skillService) {
        /**
         * Xinfa panel
         */
        $scope.xinfas = xinfaService.xinfas;
        $scope.selectedXinfa = $scope.xinfas[0];
        $scope.selectXinfa = function(xinfa) {
            $scope.selectedXinfa = xinfa;
            $scope.selectedMenuIndex = 0;
        };

        /**
         * Sidebar menu
         */
        $scope.selectedMenuIndex = 0;
        $scope.selectMenuIndex = function(index) {
            $scope.selectedMenuIndex = index;
        };


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
        $scope.target = $scope.targets[1];
        $scope.macroText =
            "/cast [qidian>7] 无我无剑\n" +
            "/cast [bufftime:玄门<5|buff:玄门<3] 人剑合一\n" +
            "/cast [nobuff:碎星辰] 碎星辰\n" +
            "/cast 八荒归元\n" +
            "/cast 天地无极\n" +
            "/cast 三环套月\n";
        $scope.frameLength = 0.01;
        $scope.worldLength = 600;
        $scope.worldAmount = 2;

        $scope.test = function() {
            $scope.dpsSum = 0;
            $scope.results = [];
            for (var i = 0; i < $scope.worldAmount; i++) {
                console.log("正在计算第" + i + "场");
                var player = avatarService.createPlayer($scope.xinfa, $scope.attributes);
                var target = avatarService.createTarget($scope.target);
                var macro = macroService.createMacro($scope.macroText);
                var world = worldService.createWorld(player, target, macro, $scope.frameLength, $scope.worldLength);
                var logger = world.simulate();
                var events = logger.events;
                var skills = [];
                var s = 0;
                for (var key in events) {
                    var event = events[key];
                    if (event.type == loggerService.EventType.DirectDamage) {
                        s += event.damage;
                        var skill = null;
                        for (var key1 in skills) {
                            if (skills[key1].name == event.skillName) {
                                skill = skills[key1];
                            }
                        }
                        if (skill == null) {
                            skill = {
                                name: event.skillName,
                                stats: [
                                    {
                                        count: 0,
                                        sum: 0,
                                        max: constService.MIN_NUMBER,
                                        min: constService.MAX_NUMBER
                                    },
                                    {
                                        count: 0,
                                        sum: 0,
                                        max: constService.MIN_NUMBER,
                                        min: constService.MAX_NUMBER
                                    },
                                    {
                                        count: 0,
                                        sum: 0,
                                        max: constService.MIN_NUMBER,
                                        min: constService.MAX_NUMBER
                                    },
                                    {
                                        count: 0,
                                        sum: 0,
                                        max: constService.MIN_NUMBER,
                                        min: constService.MAX_NUMBER
                                    }
                                ]
                            }
                            skills.push(skill);
                        }
                        skill.stats[event.hitType].count ++;
                        skill.stats[event.hitType].sum += event.damage;
                        skill.stats[event.hitType].max = Math.max(skill.stats[event.hitType].max, event.damage);
                        skill.stats[event.hitType].min = Math.min(skill.stats[event.hitType].min, event.damage);
                    }
                    if (event.type == loggerService.EventType.DebuffDamage) {
                        s += event.damage;
                        var skill = null;
                        for (var key1 in skills) {
                            if (skills[key1].name == event.debuffName + "(BUFF)") {
                                skill = skills[key1];
                            }
                        }
                        if (skill == null) {
                            skill = {
                                name: event.debuffName + "(BUFF)",
                                stats: [
                                    {
                                        count: 0,
                                        sum: 0,
                                        max: constService.MIN_NUMBER,
                                        min: constService.MAX_NUMBER
                                    },
                                    {
                                        count: 0,
                                        sum: 0,
                                        max: constService.MIN_NUMBER,
                                        min: constService.MAX_NUMBER
                                    },
                                    {
                                        count: 0,
                                        sum: 0,
                                        max: constService.MIN_NUMBER,
                                        min: constService.MAX_NUMBER
                                    },
                                    {
                                        count: 0,
                                        sum: 0,
                                        max: constService.MIN_NUMBER,
                                        min: constService.MAX_NUMBER
                                    }
                                ]
                            }
                            skills.push(skill);
                        }
                        skill.stats[event.hitType].count ++;
                        skill.stats[event.hitType].sum += event.damage;
                        skill.stats[event.hitType].max = Math.max(skill.stats[event.hitType].max, event.damage);
                        skill.stats[event.hitType].min = Math.min(skill.stats[event.hitType].min, event.damage);
                    }
                }
                $scope.results.push({
                    dps: s / $scope.worldLength,
                    events: events,
                    skills: skills
                });
                $scope.dpsSum = $scope.dpsSum + s;
                //console.log(skills);
            }
            $scope.selectedResult = $scope.results[0];
            $scope.selectedSkill = $scope.selectedResult.skills[0];
        };
        $scope.selectResult = function(result) {
            $scope.selectedResult = result;
        };
        $scope.selectSkill = function(skill) {
            $scope.selectedSkill = skill;
        }
    }
]);