angular
  .module('app')
  .directive('shareable', function() {
    return {
      restrict: 'A',
      replace: false,
      templateUrl: 'app/templates/components/shareable.html'
    };
  });
