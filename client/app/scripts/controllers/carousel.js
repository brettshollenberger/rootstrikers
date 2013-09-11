angular
  .module('app')
  .controller('CarouselDemoCtrl', [
    '$scope',
    'featureService',
    function($scope, Feature) {
      $scope.homepageInterval = 5000;
      var slides = $scope.slides = [];

      Feature.getPublished().then(function(response) {
        $scope.features = response;
        startSlider();
      });

      function startSlider() {
        $scope.features.forEach(function(feature) {
          $scope.addSlide(feature);
        });
      }

      $scope.addSlide = function(feature) {
        var newWidth = 200 + ((slides.length + (25 * slides.length)) % 150);
        slides.push({
          image: feature.image,
          message: feature.message,
          action: feature.action,
          actionUrl: feature.actionUrl
        });
      };
    }]);

