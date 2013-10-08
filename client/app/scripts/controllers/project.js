angular
  .module('app')
  .controller('projectController', [
    '$scope',
    '$rootScope',
    '$routeParams',
    '$cookieStore',
    'actionService',
    'actionKitService',
    'projectService',
    'userService',
    'MetaMachine',
    'selectLocation',
    '$location',
    function($scope, $rootScope, $routeParams, $cookieStore, actionService, actionKitService, projectAPI, userAPI, MetaMachine, selectLocation, $location) {

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


            $scope.isPetition = function(project) {
              return project.type == 'petition';
            };
        
            MetaMachine.title($scope.project.title);

            // we need to set this every time, even if image is undfined
            // to ensure default image appears
            // the metaMachine will check if project.image exists, and if not will
            // apply default. 
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
            
            $scope.signedPledge = $cookieStore.get('signedPledge');
            
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
      
      var doAction = function(action, user) {
          actionKitService.doAction(action).then(function (response) {
              
              // if the call to Action Kit was a success
              if(response === true) {
              
                  // add a cookie to say the user has already signed
                  $cookieStore.put('signedPledge', true);
                  $scope.signedPledge = true;
              
                  // add an action entry to our DB for easy reference later
                  var myAction = new actionService({user: user, project_id: $scope.project.id});
                  myAction.$save();
                  $scope.performedAction = true;
              }
          });
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
              
              doAction(action, $rootScope.loggedUser);
              
          } else {
          
              // check if the user exists in the database already 
              action = {
                  'first_name': $scope.signer.firstName,
                  'last_name': $scope.signer.lastName,
                  'page': $scope.project.shortname,
                  'email': $scope.signer.email,
                  'zip': $scope.signer.zipCode
              };
              
              doAction(action, $scope.signer);
          }
          
      };
    }
  ]);
