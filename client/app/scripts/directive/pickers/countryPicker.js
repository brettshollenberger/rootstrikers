angular
  .module('app')
  .directive('countryPicker', ['$rootScope', function($rootScope) {
    return {
      restrict: 'E',
      replace: true,
      scope: {

      },
      templateUrl: 'app/templates/components/countryPicker.html',
      link: function(scope, element, attrs) {

      }
    };
  }]);
