angular
  .module('app')
  .controller('projectListController', [
    '$scope',
    'projectService',
    'flash',
    'MetaMachine',
    function($scope, projectAPI, notification, MetaMachine) {
      
        $scope.projects = projectAPI.getAll();
        
        MetaMachine.title("Projects", "Admin");

        $scope.remove = function(id) {
            if(confirm('Are you sure you want to delete this Project?')) {                
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