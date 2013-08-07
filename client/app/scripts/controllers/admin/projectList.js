angular
  .module('app')
  .controller('projectListController', [
    '$scope',
    'projectService',
    function($scope, projectAPI) {
      $scope.projects = projectAPI.getAll();

      $scope.remove = function(id) {
        var sure = confirm('U sure?');
        if (sure) {
          projectAPI.remove(id, function(projects) {
            $scope.projects = projects;
          });
        }
      };

      $scope.publish = function(id, status) {
        projectAPI.get(id, function(project) {
          project.publish = status;
          project.$save();
        });
      };
    }
  ]);