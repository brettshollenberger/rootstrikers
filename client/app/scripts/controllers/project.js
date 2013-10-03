angular
  .module('app')
  .controller('projectController', [
    '$scope',
    '$rootScope',
    '$routeParams',
    'actionService',
    'actionKitService',
    'projectService',
    'userService',
    'MetaMachine',
    function($scope, $rootScope, $routeParams, actionService, actionKitService, projectAPI, userAPI, MetaMachine) {
      
      
      var checkActionForUser = function() {
      
        if(!$rootScope.loggedUser || !$scope.project) return;
        
        // check to see if the user has already performed an action on this project
        actionService.hasUserActed($scope.project.id, $rootScope.loggedUser.id).then(function(response) {
            $scope.performedAction = response;
        });
      };
      
      var watcher1 = $rootScope.$watch('loggedUser', checkActionForUser);
      
      /*
      $scope.$on('$routeChangeSuccess', function() {
          watcher1();
      });
      */
      
      projectAPI.getBySlug($routeParams.name, function(err, res) {
        
        // get the project from our backend
        $scope.project = res;
        
        if($scope.project) {
            MetaMachine.title($scope.project.name);
            MetaMachine.description($scope.project.problem);
            
            checkActionForUser();
            
            // check to see if there is an actionkit page set and get that page if so
            if($scope.project.shortname) {
                actionKitService.getPage($scope.project.shortname).then(function(response){
                    if(response) {
                        $scope.project.actionkit = response;
                        $scope.project.title = response.title;
                        $scope.project.sub_title = response.petitionForm.statement_leadin;
                        $scope.project.problem = response.petitionForm.about_text;
                        $scope.project.action = response.petitionForm.statement_text;
                        $scope.project.goal = response.goal;
                    }
                });
            }
            
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
                  // if the call to Action Kit was a success
                  if(response === true) {
                      // add an action entry to our DB for easy reference later
                      var myAction = new actionService({user_id: $rootScope.loggedUser.id, project_id: $scope.project.id});
                      myAction.$save();
                      $scope.performedAction = true;             
                  } 
              });
              
          } else {
              console.log('GET FORM DATA AND SEND REQUEST');
          }
      };
    }
  ]);