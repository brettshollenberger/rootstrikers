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

        $scope.remove = function(item) {
            if(confirm('Are you sure you want to delete this Project?')) {
               /*
 console.log(item);

                item.$remove();
*/
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
