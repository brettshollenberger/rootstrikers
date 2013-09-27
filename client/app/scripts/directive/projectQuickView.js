angular
  .module('app')
  .directive('projectQuickView', function() {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'app/templates/partials/projectQuickView.html',
      link: function(scope, element, attrs) {
        scope.completed = attrs.completed;
        console.log(scope.completed);
      }
    };
  });
