j3mzApp.factory('worldService', ['avatarService', 'macroService', 'loggerService', 'skillService', 'buffService',
    function(avatarService, macroService, logger, skillService, buffService) {
        return {
            createWorld: function(player, target, macro, frameLength, worldLength) {
                return {
                    reset: function() {
                        player.reset();
                        target.reset();
                        logger.reset();
                    },
                    simulate: function() {
                        this.reset();
                        // 初始BUFF
                        player.addBuff("碎星辰", 1);
                        player.addBuff("期声", 1);
                        player.addBuff("玄门", 3);
                        for (var current = 0; current < worldLength; current += frameLength) {
                            logger.time = current;
                            this.simulateAFrame(player, target, macro);
                        }
                        return logger;
                    },
                    simulateAFrame: function(player, target, macro) {
                        // Try macro
                        for (var key in macro) if (macro.hasOwnProperty(key)) {
                            var cast = macro[key];
                            if (macroService.calculateCondition(cast.condition, player, target)) {
                                var skill = player.xinfa.getSkillByName(cast.skill);
                                if (skill != null) {
                                    player.castSkill(target, skill);
                                }
                            }
                        }
                        // Auto skills
                        for (var key in player.xinfa.skills) if (player.xinfa.skills.hasOwnProperty(key)) {
                            var skill = player.xinfa.skills[key];
                            if (skill.type == skillService.SkillType.Auto) {
                                player.castSkill(target, skill);
                            }
                        }
                        // Casting
                        if (player.isCasting) {
                            //console.log(player.castingCountDown);
                            player.castingCountDown = Math.max(player.castingCountDown - frameLength, 0);
                            if (player.castingCountDown == 0) {
                                player.useSkill(target, player.castingSkill);
                                player.castingSkill = null;
                                player.isCasting = false;
                            }
                        }
                        // GCD rotate
                        for (var key in player.gcd) if (player.gcd.hasOwnProperty(key)) {
                            player.gcd[key] = Math.max(player.gcd[key] - frameLength, 0);
                        }
                        // CD rotate
                        for (var key in player.xinfa.skills) if (player.xinfa.skills.hasOwnProperty(key)) {
                            var skill = player.xinfa.skills[key];
                            skill.cdRest = Math.max(skill.cdRest - frameLength, 0);
                        }
                        // Debuff rotate
                        var debuffList = [];
                        for (var key in target.debuffs) {
                            var debuff = target.debuffs[key];
                            debuff.duration = Math.max(debuff.duration - frameLength, 0);
                            if (debuff.duration > 0) {
                                debuffList.push(debuff);
                            }
                            else {
                                logger.logRemoveTargetDebuff(debuff, target);
                            }
                            if (debuff.tick_duration_max != null) {
                                debuff.tick_duration = Math.max(debuff.tick_duration - frameLength, 0);
                                if (debuff.tick_duration == 0) {
                                    // Determine hit type
                                    var hitType = buffService.calculateDebuffHitType(debuff, this, target);
                                    // Calculate damage
                                    var damage = buffService.calculateDebuffDamage(debuff, this, target, hitType) * debuff.level;
                                    // Log
                                    logger.logDebuffDamage(debuff, this, target, hitType, damage);
                                    // Taken damage
                                    target.attributes.damageTaken += damage;
                                    // Continue tick
                                    debuff.tick_duration = debuff.tick_duration_max;
                                }
                            }
                        }
                        target.debuffs = debuffList;
                    }
                }
            }
        };
    }
]);