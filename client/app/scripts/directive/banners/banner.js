angular
  .module('app')
  .directive('banner', function() {
    return {
      restrict: 'EA',
      scope: {
        bannerType: "@",
        bannerAction: "@",
        bannerDisabled: "=",
        bannerSubheader: "@",
        bannerActionFulfilled: "@"
      },
      templateUrl: 'app/templates/components/banner/banner.html',
      link: function(scope, element, attrs) {
      
        // disable the checkbox if the user has already performed the action
        scope.$watch('bannerDisabled', function(newValue, oldValue) {
            scope.checked = scope.bannerDisabled;
        });
      
        // Perform a call to register whether or not a user has 
        // previously interacted with this banner
        scope.check = function() {
            if(!scope.bannerDisabled) {
                scope.checked = !scope.checked;   
            }
        };
        scope.showAdditionalAction = function() {
          return scope.bannerActionFulfilled.toLowerCase() == 'donated' ||
          scope.bannerActionFulfilled.toLowerCase() == 'shared' &&
          scope.checked;
        };
      }
    };
  });
