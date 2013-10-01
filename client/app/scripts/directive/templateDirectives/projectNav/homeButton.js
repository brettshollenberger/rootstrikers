angular
  .module('app')
  .directive('projectHomeButton',
    function($location) {
    return {
      restrict: 'EA',
      templateUrl: 'app/templates/components/projectNav/homeButton.html',
      replace: false,
      controller: function($scope, $window) {
        $scope.goHome = function() {
          $window.location.href = "/";
        };
      }
    };
  });
