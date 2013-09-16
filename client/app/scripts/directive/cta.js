angular
  .module('app')
  .directive('cta', function() {
    return {
      restrict: 'EA',
      transclude: true,
      templateUrl: 'app/templates/components/cta/cta.html'
    };
  });
