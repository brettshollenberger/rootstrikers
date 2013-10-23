angular
  .module('app')
  .directive('notification',
    function() {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/templates/partials/notification.html',
        controller: ['$scope', '$element', '$attrs', 'flash', function($scope, $element, $attrs, notification) {
          $scope.message = notification.get();
          $scope.$on('flash', function(event, message) {
            $scope.message = message;
          });

          $scope.close = function() {
            $scope.message = undefined;
          };
        }]
      };
    }
  );
