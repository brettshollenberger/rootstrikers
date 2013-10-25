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
                
                    $scope.projects = projectAPI.getAll();
                
                    notification.set({
                        body: 'Your Project has been successfully removed',
                        type: 'success'
                    });
                });
            }
        };

        $scope.publish = function(id, status) {
        
            projectAPI.getById(id).then(function(response) {
                
                var project = response;
                
                project.publish = status;
                projectAPI.updateById(id, project).then(function(response) {
                    
                    $scope.projects = projectAPI.getAll();
                    
                    notification.pop({
                        body: 'Your Project has been successfully ' + (status) ? 'published' : 'unpublished',
                        type: 'success'
                    });
                });
            });
        };
    }
  ]);
