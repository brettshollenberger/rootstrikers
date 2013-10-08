angular
  .module('app')
  .directive('rootCarousel', function() {
    return {
      restrict: 'EA',
      replace: false,
      templateUrl: 'app/templates/partials/carousel.html'
    };
  });
