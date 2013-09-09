angular
  .module('app')
  .directive('facebookShareable', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/templates/components/facebookShareable.html'
    };
  });
