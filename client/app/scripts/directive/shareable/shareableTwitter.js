// @note shareableController.absUrl is already url escaped

angular
  .module('app')
  .directive('shareableTwitter', ['$location', '$window', '$cookieStore', '$rootScope', function($location, $window, $cookieStore, $rootScope) {
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
        '&tw_p=tweetbutton' +
        '&original_referer=' + shareableController.absUrl + 
        '&url=' + shareableController.absUrl;

       
        element.on('click', function() {

          // if we have share text, append to share string before we open the button
          // @Note we are setting this custom text on rootscope, and clearing it if
          //       project is non-actionkit OR doesn't have any text

          // check for share text & set share text if present
          if($rootScope.shareText) {
            twitterUrl += '&text=' + $rootScope.shareText;
          }

          $window.open(twitterUrl, '_blank');
          $window.focus();

          cookie = $cookieStore.get('twitterShared') || [];
          if (!_.include(cookie, $location.absUrl())) { cookie.push($location.absUrl()); }
          $cookieStore.put('twitterShared', cookie);
          
          $rootScope.$broadcast('twitterShared', cookie);
        });
      }
    };
  }]);
