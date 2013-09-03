angular
  .module('app')
  .controller('projectController', [
    '$scope',
    '$routeParams',
    'projectService',
    'actionKitService',
    function($scope, $routeParams, projectAPI, actionKitService) {
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
      
      $scope.donateProject = function() {
          console.log('DONATE PROJECT');
      };
      
      $scope.signPledge = function() {
          console.log('SIGN PLEDGE');
      };
      
    }
  ]);