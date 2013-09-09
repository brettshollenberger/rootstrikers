angular
  .module('app')
  .controller('featureEditController', [
    '$scope',
    '$location',
    '$routeParams',
    'userService',
    'featureService',
    'actionKitService',
    '$rootScope',
    function($scope, $location, $routeParams, userAPI, Feature, actionKitService, $rootScope) {
        $scope.feature = Feature.get({id: $routeParams.id}, function(feature) {
            return feature;
        });

        $scope.update = function() {
            $scope.feature.$update(function(response) {
                alert("Feature updated successfully");
                $location.path('/admin/features');
            });
        };
    }]);
