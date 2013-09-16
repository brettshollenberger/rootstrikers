angular
  .module('app')
  .directive('banner', function() {
    return {
      restrict: 'EA',
      scope: {
        bannerType: "@",
        bannerAction: "@",
        bannerSubheader: "@",
        bannerActionFulfilled: "@"
      },
      templateUrl: 'app/templates/components/banner/banner.html',
      link: function(scope, element, attrs) {
        // Perform a call to register whether or not a user has 
        // previously interacted with this banner
        scope.check = function() {
          scope.checked = !scope.checked;
        };
        scope.showAdditionalAction = function() {
          return
          scope.bannerActionFulfilled.toLowerCase() == 'donated' ||
          scope.bannerActionFulfilled.toLowerCase() == 'shared' && 
          scope.checked;
        };
      }
    };
  });
