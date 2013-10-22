angular
  .module('app')
  .directive('projectBackButton',
    function() {
    return {
      restrict: 'EA',
      templateUrl: 'app/templates/components/projectNav/backButton.html',
      replace: false,
      require: '^projectNav',
      link: function(scope, element, attrs, projectNavController) {
        element.hover(function() {
          scope.displayPreviousProject();
        }, function() {
          scope.displayCurrentProject();
        });
      }
    };
  });
