angular
  .module('app')
  .controller('projectListController', [
    '$scope',
    'projectService',
    function($scope, Project) {
      $scope.projects = Project.query();
    }
  ]);