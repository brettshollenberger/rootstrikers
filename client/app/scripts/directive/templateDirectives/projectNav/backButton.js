angular
  .module('app')
  .directive('projectBackButton',
    function($location) {
    return {
      restrict: 'EA',
      templateUrl: 'app/templates/components/projectNav/backButton.html',
      replace: false,
      require: '^projectNav',
      controller: function($scope, $window) {
        $scope.previousProject = function() {
          var name = $scope.displayedProject.name;
          $window.location.href = "/#!/project/" + name;
        };
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
