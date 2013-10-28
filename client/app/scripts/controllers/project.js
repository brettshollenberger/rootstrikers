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
    function($scope,
              $rootScope,
              $routeParams,
              $cookieStore,
              actionService,
              actionKitService,
              projectAPI,
              userAPI,
              MetaMachine,
              selectLocation,
              $location) {

      // our form model
      $scope.signer = {};

      // get list of states and set state to be first item
      // this prevents angular from adding an extra "blank" select to the beginning
      $scope.states = selectLocation.states();
      $scope.signer.state = $scope.states[0].abbreviation;
      $scope.action_complete = false;
      
      var checkActionForUser = function() {
      
        if(!$rootScope.loggedUser || !$scope.project) return;
        
        // check to see if the user has already performed an action on this project
        actionService.hasUserActed($scope.project.id, $rootScope.loggedUser.id).then(function(response) {
            $scope.performedAction = response;
        });
      };
      
      var watcher1 = $rootScope.$watch('loggedUser', checkActionForUser);
      

      /**
       * --------------------------------------------
       * Gets current users that have acted on this pledge 
       * --------------------------------------------
       */
      var loadCurrentUsers = function() {
          // get all of the people who have acted on this project
          actionService.getProjectActionUsers($scope.project.id).then(function(response) {
              $scope.users        = response;
              $scope.displayUsers = _.take(response, 22);
          });
      };
     
      /*
      $scope.$on('$routeChangeSuccess', function() {
          watcher1();
      });
      */
      
      projectAPI.getBySlug($routeParams.name).then(function(res) {
        
        // get the project from our backend
        $scope.project = res;

        $scope.isContentFromOldSite = function(item) {
          return item.end_date == "2012-10-20T04:00:00.000Z";
        };
        
        if($scope.project !== undefined) {


            $scope.isPetition = function(project) {
              return project.type == 'petition';
            };
            
            // check if user has already performed the project action
            checkActionForUser();
            
            // check to see if there is an actionkit page set and get that page if so
            if($scope.project.shortname) {
                actionKitService.getPage($scope.project.shortname).then(function(response) {
                    if(response) {
                        
                        // parse the actionkit return info to match the project fields
                        $scope.project = projectAPI.parseActionkit($scope.project, response);
                        
                        MetaMachine.title($scope.project.title);
                        MetaMachine.description($scope.project.action);
                        MetaMachine.image($scope.project.image);
                        MetaMachine.url($location.absUrl());
                    }
                });
            } else {
              MetaMachine.title($scope.project.title);
              if ($scope.project.body) {
                MetaMachine.description($scope.project.body);
              } else {
                MetaMachine.description($scope.project.action);
              }
              MetaMachine.image($scope.project.image);
              MetaMachine.url($location.absUrl());
            }
            
            $scope.signedPledge = $cookieStore.get('signedPledge');
            
            loadCurrentUsers();
            
            
        } else {
            MetaMachine.title();
            MetaMachine.description();
        }

      });
      
      $scope.donateProject = function() {
          //console.log('DONATE PROJECT');
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
                  
                  // save to the database AND THEN
                  // call loadCurrentUsers() which will update show 
                  // user in 'taken action' area
                  myAction.$save(function() {
                    loadCurrentUsers();
                  });

                  $scope.performedAction = true;
              }

              $scope.action_complete = true;

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
