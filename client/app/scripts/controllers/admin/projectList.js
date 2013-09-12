angular
  .module('app')
  .controller('projectListController', [
    '$scope',
    'projectService',
    'flash',
    function($scope, projectAPI, notification) {
      $scope.projects = projectAPI.getAll();

      $scope.remove = function(id) {
        var sure = confirm('U sure?');
        if (sure) {
          projectAPI.remove(id, function(projects) {
            $scope.projects = projects;
            notification.pop({
              body: 'Your Project has been successfully remove',
              type: 'success'
            });
          });
        }
      };

      $scope.publish = function(id, status) {
        projectAPI.get(id, function(project) {
          project.publish = status;
          project.$save(function() {
            notification.pop({
              body: 'Your Project has been successfully ' + (status) ? 'published' : 'unpublished',
              type: 'success'
            });
          });
        });
      };
    }
  ]);