angular
  .module('app')
  .controller('featureEditController', [
    '$scope',
    '$location',
    '$routeParams',
    'userService',
    'featureService',
    'actionKitService',
    'FormHelper',
    '$rootScope',
    function($scope, $location, $routeParams, userAPI, Feature, actionKitService, FormHelper, $rootScope) {
        $scope.feature = Feature.get({id: $routeParams.id}, function(feature) {
            return feature;
        });

        $scope.showError = FormHelper.showError;
        $scope.showSuccess = FormHelper.showSuccess;

        $scope.update = function() {
            // FormHelper.update(form, model, callback)
            FormHelper.update($scope.EditFeatureForm, $scope.feature, function() {
                alert("Feature updated successfully");
                $location.path('admin/features');
            });
        };
    }]);
