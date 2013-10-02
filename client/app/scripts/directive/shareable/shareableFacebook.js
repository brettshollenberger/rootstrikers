angular
  .module('app')
  .directive('shareableFacebook', function($location, $window) {
    return {
      restrict: 'A',
      // Load the shareable attributes in a slightly higher priority
      // than the main shareable module, so that all shareable
      // attributes are loaded in the main shareable link function
      priority: 1,
      replace: false,
      require: "^shareable",
      link: function(scope, element, attrs, shareableController) {
        shareableController.addFacebook();

        // If no image is specified, it falls back on the FontAwesome icon
        // in the layout
        scope.facebookImage = attrs.shareableFacebook || null;
        var facebookUrl = "http://www.facebook.com/#!/share.php?u=" + shareableController.absUrl;
        element.on('click', function() {
          $window.open(facebookUrl, '_blank');
          $window.focus();
        });
      }
    };
  });
