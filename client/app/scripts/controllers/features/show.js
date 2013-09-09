angular
  .module('app')
  .controller('featureShowController', [
    '$scope',
    '$routeParams',
    'userService',
    'featureService',
    'actionKitService',
    '$rootScope',
    function($scope, $routeParams, userAPI, Feature, actionKitService, $rootScope) {
        $scope.feature = Feature.get({id: $routeParams.id}, function(feature) {
            return feature;
        });
    }]);
