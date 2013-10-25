angular
  .module('app')
  .directive('projectQuickView', function() {
    return {
      restrict: 'EA',
      replace: false,
      templateUrl: 'app/templates/partials/projectQuickView.html',
      link: function(scope, element, attrs) {
        scope.completed = attrs.completed;

        scope.hasDate = function() {
          return scope.item && scope.item.end_date && scope.item.end_date !== null;
        };

        scope.isContentFromOldSite = function(item) {
          return item && item.end_date == "2012-10-20T04:00:00.000Z";
        };

        scope.completedStamp = function(item) {
          return scope.completed && !scope.isContentFromOldSite(item);
        };

      }
    };
  });
