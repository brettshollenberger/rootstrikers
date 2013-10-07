angular
  .module('app')
  .directive('projectHomeButton',
    function($location) {
    return {
      restrict: 'EA',
      templateUrl: 'app/templates/components/projectNav/homeButton.html',
      replace: false,
      require: '^projectNav',
      controller: function($scope, $window) {
        $scope.goHome = function() {
          $window.location.href = "/";
        };
      },
      link: function(scope, element, attrs, projectNavController) {
        element.hover(function() {
          projectNavController.viewAllCampaigns();
        }, function() {
          projectNavController.noAction();
        });
      }
    };
  });
