angular
  .module('app')
  .directive('bannerHalf', function() {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'app/templates/components/banner/banner-half.html',
      link: function(scope, element, attrs) {
        scope.socialType = attrs.socialType;
        scope.socialClasses = attrs.socialClasses;
        
        scope.isSocialType = function(type) {
          return scope.socialType.toLowerCase() == type.toLowerCase();
        };

        scope.check = function() {
          scope.checked = !scope.checked;
        };
      }
    };
  });
