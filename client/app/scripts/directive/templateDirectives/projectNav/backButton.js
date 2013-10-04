angular
  .module('app')
  .directive('projectBackButton',
    function() {
    return {
      restrict: 'EA',
      templateUrl: 'app/templates/components/projectNav/backButton.html',
      replace: false,
      require: '^projectNav',
      controller: function($scope, $window) {

      },
      link: function(scope, element, attrs, projectNavController) {
        element.hover(function() {
          projectNavController.findPreviousProject();
        }, function() {
          projectNavController.findNextProject();
        });
      }
    };
  });
