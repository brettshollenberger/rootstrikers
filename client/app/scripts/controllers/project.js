angular
  .module('app')
  .controller('projectController', [
    '$scope',
    '$routeParams',
    'projectService',
    'actionKitService',
    '$rootScope',
    function($scope, $routeParams, projectAPI, actionKitService, $rootScope) {
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
          
          if($rootScope.loggedUser) {
          
              // make the call to ActionKit to sign the petition
              var action = {
                  'page': $scope.project.shortname,
                  'email': $rootScope.loggedUser.email,
                  'zip': $rootScope.loggedUser.zip
              };
              
              actionKitService.doAction(action).then(function (response) {
                  //console.log(response);
              });
              
          } else {
              // prompt the user to log in
              console.log('USER NEEDS TO LOG IN');
          }
          
      };
      
    }
  ]);