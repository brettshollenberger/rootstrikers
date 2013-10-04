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
    'selectLocation',
    '$location',
    function($scope, $rootScope, $routeParams, actionService, actionKitService, projectAPI, userAPI, MetaMachine, selectLocation, $location) {

      // our form model
      $scope.signer = {};

      // get list of states and set state to be first item
      // this prevents angular from adding an extra "blank" select to the beginning
      $scope.states = selectLocation.states();
      $scope.signer.state = $scope.states[0].abbreviation;
      
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

        $scope.isContentFromOldSite = function(item) {
          return item.end_date == "2012-10-20T04:00:00.000Z";
        };
        
        if($scope.project) {
        
            MetaMachine.title($scope.project.name);
            MetaMachine.description($scope.project.problem);
            MetaMachine.image($scope.project.image);
            MetaMachine.url($location.absUrl());
            
            // check if user has already performed the project action
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
                        
                        if($scope.project.actionkit.goal_type === 'actions') {
                            $scope.project.actionsNeeded = $scope.project.actionkit.goal;
                        }
                    }
                });
            }
            
            // get all of the people who have acted on this project
            actionService.getProjectActionUsers($scope.project.id).then(function(response) {
                $scope.users = response;
            });
            
        } else {
            MetaMachine.title();
            MetaMachine.description();
        }

      });
      
      $scope.donateProject = function() {
          console.log('DONATE PROJECT');
      };
      
      $scope.signPledge = function() {
          
          var action = {};
          
          if($rootScope.loggedUser) {
          
              // make the call to ActionKit to sign the petition
              action = {
                  'page': $scope.project.shortname,
                  'email': $rootScope.loggedUser.email,
                  'zip': $rootScope.loggedUser.zip
              };
              
          } else {
              console.log('GET FORM DATA AND SEND REQUEST');
              
              action = {
                  'page': $scope.project.shortname,
                  'email': $scope.signer.email,
                  'zip': $scope.signer.zipCode
              };
          }
          
          var userId = $rootScope.loggedUser ? $rootScope.loggedUser.id : '0000000000';
          
          console.log('USER ID');
          console.log(userId);
          
          actionKitService.doAction(action).then(function (response) {
          
              console.log(response);
                     
              // if the call to Action Kit was a success
              if(response === true) {
              
                  console.log('THIS IS SUCCESSFUL');
              
                  // add an action entry to our DB for easy reference later
                  var myAction = new actionService({user_id: userId, project_id: $scope.project.id});
                  myAction.$save();
                  $scope.performedAction = true;             
              } 
          });
      };
    }
  ]);
