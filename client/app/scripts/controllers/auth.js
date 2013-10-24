angular
  .module('app')
  .controller('authController', [
    '$scope',
    '$location',
    'userService',
    'Facebook',
    'actionKitService',
    'flash',
    '$anchorScroll',
    function($scope, $location, userAPI, FB, actionKitService, notification, $anchorScroll) {
      var inkBlob, inkBlobThumb, saveSuccess = function() {
        notification.pop({
          body: 'Your account have been created and a message to verify your account has been send. Please check your email to finish the process',
          type: 'success'
        });
      };
      $scope.formErrors = {};
      $scope.formUser = userAPI.newUser();
      $scope.joinSigner = {};
      $scope.loginErrors = {};
      $scope.loginUser = {};
      $scope.registerStep = 1;
      $scope.join_success = false;
      
      $scope.advanceStep = function() {
         $scope.registerStep++; 
      };

      $scope.join = function() {
      
          var joinUser = {
              first_name: $scope.joinSigner.firstName,
              last_name: $scope.joinSigner.lastName,
              email: $scope.joinSigner.email,
              zip: $scope.joinSigner.zipCode
          };
          
          var user = userAPI.newUser(joinUser);
          user.$save();
          $scope.join_success = true;
      };

      $scope.register = function() {
    
          userAPI.ngGet({email: $scope.formUser.email}, function(user) {

            // If the user was already saved in our db, we must alert the user
            // that the email address is already registered
            if (user.email) {
              userAlreadyRegistered();
            } else {
            // Start by saving the user, logging them in, and closing the modal so
            // that the user can move on. The ActionKit API call is slow, so we
            // can always add the ActionID later. 
              $scope.formUser.$save();
              // Show gravatar
              $scope.loginUser = {
                email: $scope.formUser.email,
                password: $scope.formUser.password
              };
              $scope.login(false);
              $scope.registerStep = 4;
              //_close();
            // make a call to see if this user has already signed up with ActionKit
              actionKitService.getUser($scope.formUser.email).then(function(akUser) {
                // the user has not already signed up with ActionKit
                if(akUser === false) {
                  
                  var user = {
                      'email': $scope.formUser.email,
                      'first_name': $scope.formUser.first_name,
                      'last_name': $scope.formUser.last_name,
                      'city': $scope.formUser.city,
                      'state': $scope.formUser.state,
                      'zip': $scope.formUser.zip.toString()
                  };

                  actionKitService.createUser(user).then(function (userId) {
                    $scope.formUser.actionId = userId;
                    $scope.formUser.actionId = userId;
                    //$scope.formUser.$update();
                  });
                } else {
                  $scope.formUser.actionId = akUser.id;
                  $scope.formUser.$update();
                }
                _clearUser();
              });
            }
          });
          
      };

      var userAlreadyRegistered = function() {
         _addError('email', 'Email address already registered');
         $location.hash('registeremail');
        
         $scope.registerStep = 1;
        
        $anchorScroll();
      };

      $scope.update = function() {
        
        _clearErrors();
        
        // perform if there were no user form errors
        if (Object.keys($scope.formErrors).length === 0) {
              
          if($scope.loggedUser.newPassword) {
              $scope.loggedUser.password = $scope.loggedUser.newPassword;
          }
          
          userAPI.updateUser($scope.loggedUser, function(updateResponse) {
              _close();
          });
              
        } else {
            console.log("There were Errors on the User Form");
        }
      };

      $scope.login = function(closeModal) {
        
        closeModal = closeModal || true;
        
        _clearErrors();

        userAPI.login($scope.loginUser).error(function(data, status) {
          _addError('extra', 'Login failed. Please check your Username and Password.', 'loginErrors');
        }).success(function() {
          if(closeModal) _close();
          // redirect the admin user to the admin dashboard
          $location.path('/admin');
        });
      };

      $scope.logout = function() {
        _clearErrors();
        _close();
        userAPI.logout();
        $location.path('/');
      };

      $scope.cancel = function() {
      
        _clearUser();
      
        if (inkBlob) {
          try {
            filepicker.remove(inkBlobThumb);
            filepicker.remove(inkBlob);
          } catch (err) {

          }
        }
        _close();
      };

      $scope.clear = function() {
        _clearUser();
        _clearErrors();
      };

      $scope.fbLogin = function() {
        _clearErrors();
        FB.login().then(function(user) {
          userAPI.facebookLogin(user);
          //_close();
        }, function() {
          _addError('extra', "Facebook Login Fail");
        });
      };

      $scope.uploadAvatar = function() {
        filepicker.setKey('ACoTSGXT4Rj2XWKKTZAaJz');
        filepicker.pick({
          'mimetype': "image/*"
        }, function(InkBlob) {
          filepicker.convert(InkBlob, {
              width: 200,
              height: 200
            },
            function(InkThumb) {
              $scope.formUser.thumb = InkThumb.url;
              $scope.$digest();
              inkBlobThumb = InkThumb;
            });
          inkBlob = InkBlob;
          $scope.formUser.avatar = InkBlob.url;
        });
      };
      
      $scope.yourWelcome = function() {
          _close();
      };

      //private methods to handle common task

      function _close() {
        _clearErrors();
        if ($scope.closeModal) {
          
          $scope.closeModal();
        }
        $scope.registerStep = 1;
      }

      function _clearErrors() {
        $scope.formErrors = {};
        $scope.loginErrors = {};
      }

      function _clearUser() {
        $scope.formUser = null;
        $scope.formUser = {};
        
        $scope.loginUser = null;
        $scope.loginUser = {};
      }

      function _addError(field, message, type) {
        var form = type || 'formErrors';
        $scope[form][field] = message;
      }

      function _errored(response) {
        if (response.errors) {
          Object.each(response.errors, function(field, errors) {
            _addError(field, errors.first());
          });
        }
      }
    }
  ]);
