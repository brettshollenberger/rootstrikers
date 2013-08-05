angular
  .module('app')
  .controller('projectListController', [
    '$scope',
    'projectService',
    function($scope, project) {
      $scope.projects = project.getAll();
    }
  ]);