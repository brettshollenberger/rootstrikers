angular
  .module('app')
  .controller('homeController', [
    '$rootScope',
    '$scope',
    'projectService',
    function($rootScope, $scope, projectAPI) {
      $scope.projects = projectAPI.getPublished();
    }
  ]);