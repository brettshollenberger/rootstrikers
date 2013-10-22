angular
  .module('app')
  .directive('statePicker', ['$rootScope', function($rootScope) {
    return {
      restrict: 'E',
      replace: true,
      scope: {

      },
      templateUrl: 'app/templates/components/statePicker.html',
      link: function(scope, element, attrs) {

      }
    };
  }]);
