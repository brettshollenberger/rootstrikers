angular
  .module('app')
  .directive('statePicker', function($rootScope) {
    return {
      restrict: 'E',
      replace: true,
      scope: {

      },
      templateUrl: 'app/templates/components/statePicker.html',
      link: function(scope, element, attrs) {

      }
    };
  });
