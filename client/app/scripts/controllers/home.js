angular
  .module('app')
  .controller('homeController', [
    '$rootScope',
    '$scope',
    'userService',
    'projectService',
    'featureService',
    function($rootScope, $scope, userService, Project, Feature, actionKitService) {
      $scope.projects = Project.getActive();
      $scope.completed_projects = Project.getCompleted();
      console.log($scope.projects);
      $scope.features = Feature.getPublished();
      // This users object serves no useful purpose in the final app, 
      // but we need something to stand-in for gravatars until we write
      // an association for project.supporters
      $scope.users = userService.getAll();
    }
  ]);
