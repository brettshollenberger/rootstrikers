angular
  .module('app')
  .directive('projectItem', function() {
    return {
      restrict: 'EA',
      replace: false,
      templateUrl: 'app/templates/partials/projectDetail.html',
      scope: true
    };
  });