angular
  .module('app')
  .directive('shareableTemplate', ['$location', function($location) {
    return {
      restrict: 'EA',
      replace: false,
      scope: {},
      templateUrl: 'app/templates/components/shareable.html',
      require: '^shareable',
      link: function(scope, element, attrs, shareableController) {
        scope.inShareableNetworks = shareableController.inShareableNetworks;
      }
    };
  }]);

