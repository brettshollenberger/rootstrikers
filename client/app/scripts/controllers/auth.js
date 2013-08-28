angular
  .module('app')
  .controller('authController', [
    '$scope',
    'userService',
    'Facebook',
    function($scope, userAPI, FB) {
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
        userAPI.login($scope.formUser);
        _close();
      };

      $scope.logout = function() {
        _clearErrors();
        _close();
        userAPI.logout();
      };

      $scope.close = _close;

      $scope.clear = function() {
        _clearUser();
        _clearErrors();
      };

      $scope.fbLogin = function() {
        _clearErrors();
        FB.login().then(function(user) {
          userAPI.createFromFB(user);
          _close();
        }, function() {
          _addError('extra', "Facebook Login Fail");
        });
      };

      //private methods to handle common task

      function _close() {
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