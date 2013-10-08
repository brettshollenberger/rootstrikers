angular
  .module('app')
  .controller('projectListController', [
    '$scope',
    'projectService',
    'flash',
    'MetaMachine',
    '$location',
    function($scope, projectAPI, notification, MetaMachine, $location) {
      
        $scope.projects = projectAPI.getAll();
        
        MetaMachine.title("Projects", "Admin");

        $scope.remove = function(item) {
            if(confirm('Are you sure you want to delete this Project?')) {
                item.$remove(function() {
                    notification.set({
                        body: 'Your Project has been successfully removed',
                        type: 'success'
                    });
                    $location.path('admin').replace();
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
