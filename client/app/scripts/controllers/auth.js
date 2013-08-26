angular
  .module('app')
  .controller('authController', [
    '$scope',
    'userService',
    function($scope, userAPI) {
      $scope.formUser = userAPI.newUser();
      $scope.errors = {};

      $scope.register = function() {
        _clearErrors();

        if ($scope.formUser.password !== $scope.formUser.passConfirmation) {
          _addError('password', 'Password mismatch');
          _addError('passConfirmation', 'Password mismatch');
        }

        if ($scope.formUser.password.length < 6) {
          _addError('password', 'Too short. Minimum of six characters');
        }

        if (Object.keys($scope.errors).length === 0) {
          return $scope.formUser.$save();
        } else {
          return false;
        }
      };

      $scope.login = function() {
        _clearErrors();
        return userAPI.login($scope.formUser);
      };

      $scope.logout = function() {
        return userAPI.logout();
      };

      $scope.clear = function() {
        _clearUser();
        _clearErrors();
      };

      //private methods to handle common task

      function _clearErrors() {
        $scope.errors = null;
        $scope.errors = {};
      }

      function _clearUser() {
        $scope.formUser = null;
        $scope.formUser = {};
      }

      function _addError(field, message) {
        $scope.errors[field] = message;
      }

      function _errored(response) {
        if (response.errors) {
          Object.each(response.errors, function(field, errors) {
            _addError(field, errors.first());
          });

          if ($scope.errors.ip) {
            _addError('extra', $scope.errors.ip);
          }

          if (response.errors.base && Object.isString(response.errors.base)) {
            _addError('extra', response.errors.base);
          }
        }
      }
    }
  ]);