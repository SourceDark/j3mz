var j3mzApp = angular.module('j3mzApp', ['ngAnimate'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
});