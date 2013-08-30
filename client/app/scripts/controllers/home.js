angular
  .module('app')
  .controller('homeController', [
    '$rootScope',
    '$scope',
    'projectService',
    function($rootScope, $scope, projectAPI, actionKitService) {
      $scope.projects = projectAPI.getPublished(); 
    }
  ]);