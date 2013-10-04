angular
  .module('app')
  .controller('CarouselDemoCtrl', [
    '$scope',
    'featureService',
    function($scope, Feature) {
      $scope.homepageInterval = 5000;
      var slides = $scope.slides = [];

      /**
      * Gets all published "features" from api
      *
      */
      Feature.getPublished().then(function(response) {
        $scope.features = response;
        startSlider();
      });

      /**
      * helper method which starts slider 
      * by adding each slide to the slides array
      *
      */
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

