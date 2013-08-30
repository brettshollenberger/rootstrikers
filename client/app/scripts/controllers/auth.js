angular
  .module('app')
  .controller('authController', [
    '$scope',
    'userService',
    'Facebook',
    function($scope, userAPI, FB) {
      var inkBlob, inkBlobThumb;
      $scope.formUser = userAPI.newUser();
      $scope.formErrors = {};

      $scope.register = function() {
        _clearErrors();

        if ($scope.formUser.password !== $scope.formUser.passConfirmation) {
          _addError('password', 'Password mismatch');
          _addError('passConfirmation', 'Password mismatch');
        }

        if ($scope.formUser.password.length < 6) {
          _addError('password', 'Too short. Minimum of six characters');
        }

        if (Object.keys($scope.formErrors).length === 0) {
          $scope.formUser.$save();
          _close();
        }
      };

      $scope.login = function() {
        _clearErrors();
        userAPI.login($scope.formUser).error(function(data, status) {
          _addError('extra', 'Login Invalid');
        }).success(function() {
          _close();
        });
      };

      $scope.logout = function() {
        _clearErrors();
        _close();
        userAPI.logout();
      };

      $scope.cancel = function() {
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
          _close();
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

      //private methods to handle common task

      function _close() {
        _clearErrors();
        if ($scope.closeModal) {
          $scope.closeModal();
        }
      }


      function _clearErrors() {
        $scope.formErrors = null;
        $scope.formErrors = {};
      }

      function _clearUser() {
        $scope.formUser = null;
        $scope.formUser = {};
      }

      function _addError(field, message) {
        $scope.formErrors[field] = message;
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