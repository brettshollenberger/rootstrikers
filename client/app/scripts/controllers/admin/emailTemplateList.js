angular
  .module('app')
  .controller('emailListController', [
    '$scope',
    'emailService',
    function($scope, emailAPI) {
      $scope.emails = emailAPI.getAll();

      $scope.remove = function(id) {
        var sure = confirm('U sure?');
        if (sure) {
          emailAPI.remove(id, function(emails) {
            $scope.emails = emails;
          });
        }
      };
    }
  ]);