angular
  .module('app')
  .controller('projectController', [
    '$scope',
    '$routeParams',
    'userService',
    'projectService',
    function($scope, $routeParams, userAPI, projectAPI) {
      projectAPI.getByName($routeParams.name, function(err, res) {
        $scope.project = res;
      });
      // Change to specific users signed up on project
      $scope.users = userAPI.getAll();
    }
  ]);
