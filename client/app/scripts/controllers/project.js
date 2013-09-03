angular
  .module('app')
  .controller('projectController', [
    '$scope',
    '$routeParams',
    'userService',
    'projectService',
    'actionKitService',
    function($scope, $routeParams, userAPI, projectAPI, actionKitService) {
      projectAPI.getByName($routeParams.name, function(err, res) {
        
        // get the project from our backend
        $scope.project = res;
        
        // check to see if there is an actionkit page set and get that page if so
        if($scope.project.shortname) {
            actionKitService.getPage($scope.project.shortname).then(function(response){
                if(response) {
                    $scope.project.actionkit = response;
                }
            });
        }
        
      });
      // Change to specific users signed up on project
      $scope.users = userAPI.getAll();
      
      $scope.donateProject = function() {
          console.log('DONATE PROJECT');
      };
      
      $scope.signPledge = function() {
          console.log('SIGN PLEDGE');
      };
      
    }
  ]);
