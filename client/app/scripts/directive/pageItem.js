angular
  .module('app')
  .directive('pageItem', function() {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'app/templates/partials/pageDetail.html',
      scope: true
    };
  });