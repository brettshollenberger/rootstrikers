angular
  .module('app')
  .directive('pageItem', function() {
    return {
      restrict: 'EA',
      replace: false,
      templateUrl: 'app/templates/partials/pageDetail.html',
      scope: true
    };
  });