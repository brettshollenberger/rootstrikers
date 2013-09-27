angular
  .module('app')
  .directive('projectItem', function() {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'app/templates/partials/projectDetail.html',
      scope: true
    };
  });