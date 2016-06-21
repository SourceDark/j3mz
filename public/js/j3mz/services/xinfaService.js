j3mzApp.factory('xinfaService', function() {
    var xinfas = [
        {
            name: '太虚剑意',
            useWeapon: true
        },
        {
            name: '紫霞功',
            useWeapon: false
        }
    ];
    return {
        xinfas: xinfas,
        getXinfaTypeByName: function(xinfaName) {
            for (var key in xinfas) {
                var xinfa = xinfas[key];
                if (xinfa.name == xinfaName) {
                    return xinfa;
                }
            }
        }
    };
});