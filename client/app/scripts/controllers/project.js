angular
  .module('app')
  .controller('projectController', [
    '$scope',
    '$routeParams',
    'userService',
    'projectService',
    'actionKitService',
    '$rootScope',
    'MetaMachine',
    function($scope, $routeParams, userAPI, projectAPI, actionKitService, $rootScope, MetaMachine) {
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
        
        if ($scope.project) {
          MetaMachine.title($scope.project.name);
          MetaMachine.description($scope.project.problem);
        } else {
          MetaMachine.title();
          MetaMachine.description();
        }

      });
      // Change to specific users signed up on project
      $scope.users = userAPI.getAll();
      
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
