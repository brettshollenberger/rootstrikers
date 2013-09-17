angular
  .module('app')
  .controller('featureNewController', [
    '$scope',
    '$location',
    '$routeParams',
    'userService',
    'featureService',
    'actionKitService',
    'FormHelper',
    '$rootScope',
    function($scope, $location, $routeParams, userAPI, Feature, actionKitService, FormHelper, $rootScope) {
        $scope.feature = new Feature();

        $scope.showError = FormHelper.showError;
        $scope.showSuccess = FormHelper.showSuccess;

        $scope.create = function() {
            // FormHelper.create(form, model, callback)
            FormHelper.create($scope.NewFeatureForm, $scope.feature, function() {
                $location.path('/admin/features/' + $scope.feature.id + "/edit");
                alert("Feature saved successfully!");
            });
        };

    }]);
