j3mzApp.factory('worldService', ['avatarService', function(avatarService) {
    return {
        createWorld: function(player, target, macro, frameLength, worldLength) {
            return {
                simulate: function() {
                    for (var current = 0; current < worldLength; current ++) {
                        avatarService.simulateAFrame(player, target, macro);
                    }
                }
            }
        }
    };
}]);