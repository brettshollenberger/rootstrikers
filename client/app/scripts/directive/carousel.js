angular
  .module('app')
  .directive('rootCarousel', function() {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'app/templates/partials/carousel.html'
    };
  });
