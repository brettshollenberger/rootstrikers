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
        
        var removeHash = function(url) {
            return url.replace('#!/', '');
        };

        // If no image is specified, it falls back on the FontAwesome icon
        // in the layout
        scope.twitterImage = attrs.shareableTwitter || null;
        
        // build the url for sharing
        var twitterUrl = 'https://twitter.com/intent/tweet?hashtags=rootstrikers' + 
        '&original_referer=' +
        encodeURIComponent((shareableController.absUrl)) + 
        '&url=' + encodeURIComponent(removeHash(shareableController.absUrl));
        
     /*
   
        https://twitter.com/intent/tweet?hashtags=rootstrikers&original_referer=https%3A%2F%2Ftwitter.com%2Fabout%2Fresources%2Fbuttons&text=Twitter%20%2F%20Twitter%20buttons&tw_p=tweetbutton&url=http%3A%2F%2Frs.com%2Fproject&via=mattmillerart
        
        https://twitter.com/intent/tweet?hashtags=rootstrikers&original_referer=http%3A%2F%2Frs002dev.herokuapp.com%252F%2523%2521%252Fproject%2Fvoters-not-donors&url=http%3A%2F%2Frs002dev.herokuapp.com%252F%2523%2521%252Fproject%2Fvoters-not-donors
*/
            
        console.log(twitterUrl);
        
        element.on('click', function() {
          $window.open(twitterUrl, '_blank');
          $window.focus();
        });
      }
    };
  });
