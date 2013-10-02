angular
  .module('app')
  .directive('countryPicker', function($rootScope) {
    return {
      restrict: 'E',
      replace: true,
      scope: {

      },
      templateUrl: 'app/templates/components/countryPicker.html',
      link: function(scope, element, attrs) {

      }
    };
  });
