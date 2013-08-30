angular
  .module('app')
  .directive('rootFooter', function() {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'app/templates/partials/footer.html'
    };
  });
