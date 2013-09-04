angular
  .module('app')
  .directive('notification', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/templates/partials/notification.html',
      controller: function($scope) {
        $scope.on('flash', function(message) {
          $scope.message = message;
        });
      }
    };
  });