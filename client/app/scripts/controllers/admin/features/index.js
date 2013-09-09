angular
  .module('app')
  .controller('featureIndexController', [
    '$scope',
    '$routeParams',
    'userService',
    'featureService',
    'actionKitService',
    '$rootScope',
    function($scope, $routeParams, userAPI, Feature, actionKitService, $rootScope) {
        $scope.features = Feature.query(function(features) {
            return features;
        });

        $scope.destroy = function(featureId) {
            var confirmation = confirm("Are you sure you want to remove this feature? It will be deleted forever.");
            if (confirmation) {
                Feature.remove({id: featureId}, function(response) {
                    $scope.features.splice(featureId, 1);
                });
            }
        };

        $scope.publish = function(featureId, status) {
            var confirmation = confirm("If published, this feature will become live on the site. Are you sure you want to publish?");
            if (confirmation) {
                Feature.update({id: featureId}, {published: status}, function(response) {
                    $scope.features.forEach(function(feature) {
                        if (feature.id === featureId) {
                            feature.published = status;
                        }
                    });
                });
            }
        };

    }]);
