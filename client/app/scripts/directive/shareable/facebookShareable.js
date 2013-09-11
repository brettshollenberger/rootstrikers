angular
  .module('app')
  .directive('facebookShareable', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/templates/components/facebookShareable.html',
      link: function(scope, element, attr) {
        scope.absUrl = $location.absUrl().replace('/#/', '');
      }
    };
  });
