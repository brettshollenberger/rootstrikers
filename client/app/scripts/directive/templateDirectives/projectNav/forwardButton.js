angular
  .module('app')
  .directive('projectForwardButton',
    function($location) {
    return {
      restrict: 'EA',
      templateUrl: 'app/templates/components/projectNav/forwardButton.html',
      replace: false,
      require: '^projectNav',
      controller: function($scope, $window) {
        $scope.nextProject = function() {
          var name = $scope.displayedProject.name;
          $window.location.href = "/#!/project/" + name;
        };
      },
      link: function(scope, element, attrs, projectNavController) {
        element.hover(function() {
          projectNavController.findNextProject();
        }, function() {
          projectNavController.findPreviousProject();
        });
      }
    };
  });
