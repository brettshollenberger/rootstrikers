angular
  .module('app')
  .controller('featureNewController', [
    '$scope',
    '$location',
    '$routeParams',
    'userService',
    'featureService',
    'actionKitService',
    '$rootScope',
    function($scope, $location, $routeParams, userAPI, Feature, actionKitService, $rootScope) {
        $scope.feature = new Feature();

        $scope.create = function() {
            $scope.feature.$save(function() {
                $location.path('/admin/features/' + $scope.feature.id + "/edit");
            });
        };
    }]);
