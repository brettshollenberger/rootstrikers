angular
  .module('app')
  .directive('projectQuickView', function() {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'app/templates/partials/projectQuickView.html',
      link: function(scope, element, attrs) {
        scope.completed = attrs.completed;

        scope.hasDate = function() {
          return scope.item.end_date !== null;
        };

        scope.isContentFromOldSite = function(item) {
          return scope.item.end_date == "2012-10-20T04:00:00.000Z";
        };

        scope.completedStamp = function(item) {
          return scope.completed && !scope.isContentFromOldSite(item);
        };

      }
    };
  });
