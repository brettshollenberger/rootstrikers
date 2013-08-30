angular
  .module('app')
  .directive('projectQuickView', function() {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'app/templates/partials/projectQuickView.html'
    };
  });
