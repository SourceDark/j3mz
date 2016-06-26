j3mzApp.controller('indexCtrl', ['$scope', 'worldService', 'xinfaService', 'avatarService', 'constService', 'macroService', 'loggerService', 'skillService', 'targetService',
    function($scope, worldService, xinfaService, avatarService, constService, macroService, loggerService, skillService, targetService) {
        /**
         * Player
         */
        $scope.player = avatarService.createPlayer();

        /**
         * Xinfa
         */
        $scope.xinfas = xinfaService.getXinfas();
        $scope.selectXinfa = function(xinfa) {
            $scope.player.setXinfa(xinfa);
            $scope.selectedMenuIndex = 1;
        };
        $scope.selectXinfa($scope.xinfas[0]);

        /**
         * Sidebar
         */
        $scope.selectMenuIndex = function(index) {
            $scope.selectedMenuIndex = index;
        };

        /**
         * Qixue
         */
        $scope.qixue_section_fold = true;
        $scope.alterQixueSection = function() {
            $scope.qixue_section_fold = !$scope.qixue_section_fold;
        };
        $scope.unfold_qixue = null;
        $scope.alterQixue = function(qixue) {
            if ($scope.unfold_qixue == qixue) {
                $scope.unfold_qixue = null;
            }
            else {
                $scope.unfold_qixue = qixue;
            }
        };
        $scope.selectQixueOptionIndex = function(qixue, index) {
            qixue.active = index;
            $scope.unfold_qixue = null;
        };

        /**
         * Miji
         */
        $scope.miji_section_fold = true;
        $scope.alterMijiSection = function() {
            $scope.miji_section_fold = !$scope.miji_section_fold;
        };
        $scope.alterMijiOption = function(skill, miji) {
            skill.mijis.active_count = skill.mijis.active_count - (miji.active ? 1 : 0);
            miji.active = !miji.active;
            skill.mijis.active_count = skill.mijis.active_count + (miji.active ? 1 : 0);
        };

        /**
         * Attr
         */
        $scope.attr_section_fold = false;
        $scope.alterAttrSection = function() {
            $scope.attr_section_fold = !$scope.attr_section_fold;
        };

        /**
         * Target
         */
        $scope.target_section_fold = false;
        $scope.alterTargetSection = function() {
            $scope.target_section_fold = !$scope.target_section_fold;
        };
        $scope.targetTypes = targetService.getTargetTypes();
        $scope.selectTargetType = function(targetType) {
            $scope.selectedTargetType = targetType;
        };
        $scope.selectTargetType($scope.targetTypes[0]);
        $scope.targetHpUpperLimit = 5000000;
        $scope.targetHpStartRate = 100;
        $scope.targetHpEndRate = 0;

        /**
         * World
         */
        $scope.world_section_fold = false;
        $scope.alterWorldSection = function() {
            $scope.world_section_fold = !$scope.world_section_fold;
        };

        /**
         * Dps Simulation
         */
        $scope.sim = function() {
            var player = $scope.player;
            var target = avatarService.createTarget();
            target.setAttributes({
                
            });
            console.log($scope.player);
            console.log($scope.selectedTargetType);
        };

        /*
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
        $scope.worldAmount = 2;*/

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