angular
  .module('app')
  .directive('shareableTwitter', function($location, $window) {
    return {
      restrict: 'A',
      // Load the shareable attributes in a slightly higher priority
      // than the main shareable module, so that all shareable
      // attributes are loaded in the main shareable link function
      priority: 1,
      replace: false,
      require: "^shareable",
      link: function(scope, element, attrs, shareableController) {
        shareableController.addTwitter();

        // If no image is specified, it falls back on the FontAwesome icon
        // in the layout
        scope.twitterImage = attrs.shareableTwitter || null;
        var twitterUrl  = "https://twitter.com/intent/tweet?original_referer=" + shareableController.absUrl + "&amp;url=" + shareableController.absUrl + "&amp;source=tweetbutton";
        element.on('click', function() {
          $window.location.href = twitterUrl;
        });
      }
    };
  });
