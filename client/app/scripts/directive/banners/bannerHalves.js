angular
  .module('app')
  .directive('bannerHalves', function() {
    return {
      restrict: 'EA',
      templateUrl: 'app/templates/components/banner/banner-halves.html'
    };
  });
