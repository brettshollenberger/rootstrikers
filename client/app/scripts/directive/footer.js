angular
  .module('app')
  .directive('rootFooter', function() {
    return {
      restrict: 'EA',
      replace: false,
      templateUrl: 'app/templates/partials/footer.html'
    };
  });
