angular
  .module('app')
  .directive('notification', ['flash',
    function(notification) {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/templates/partials/notification.html',
        controller: function($scope, $element, $attrs) {
          $scope.message = notification.get();
          $scope.$on('flash', function(event, message) {
            $scope.message = message;
          });

          $scope.close = function() {
            $scope.message = undefined;
          };
        }
      };
    }
  ]);