angular
  .module('app')
  .directive('twitterShareable', ['$location', function($location) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/templates/components/twitterShareable.html',
      scope: true,
      link: function(scope, element, attr) {
        scope.absUrl = $location.absUrl();
      }
    };
  }]);
