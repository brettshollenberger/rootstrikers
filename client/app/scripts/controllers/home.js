angular
  .module('app')
  .controller('homeController', [
    '$rootScope',
    '$scope',
    'projectService',
    'actionKitService',
    function($rootScope, $scope, projectAPI, actionKitService) {
      $scope.projects = projectAPI.getPublished();
    }
  ]);