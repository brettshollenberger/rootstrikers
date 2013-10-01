angular
  .module('app')
  .directive('shareableTemplate', function($location) {
    return {
      restrict: 'E',
      replace: false,
      scope: {},
      templateUrl: 'app/templates/components/shareable.html',
      require: '^shareable',
      link: function(scope, element, attrs, shareableController) {
        scope.inShareableNetworks = shareableController.inShareableNetworks;
      }
    };
  });

