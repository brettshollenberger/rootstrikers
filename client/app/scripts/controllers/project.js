angular
  .module('app')
  .controller('projectController', [
    '$scope',
    '$routeParams',
    'projectService',
    function($scope, $routeParams, projectAPI) {
      projectAPI.getByName($routeParams.name, function(err, res) {
        $scope.project = res;
      });
    }
  ]);