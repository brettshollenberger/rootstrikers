angular
  .module('app')
  .directive('projectForwardButton',
    function() {
    return {
      restrict: 'EA',
      templateUrl: 'app/templates/components/projectNav/forwardButton.html',
      replace: false,
      require: '^projectNav',
      link: function(scope, element, attrs, projectNavController) {
        element.hover(function() {
          scope.displayNextProject();
        }, function() {
          scope.displayNone();
        });
      }
    };
  });
