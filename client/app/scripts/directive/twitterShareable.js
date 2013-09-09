angular
  .module('app')
  .directive('twitterShareable', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/templates/components/twitterShareable.html'
    };
  });
