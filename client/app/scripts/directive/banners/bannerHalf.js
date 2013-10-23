angular
  .module('app')
  .directive('bannerHalf', ['$cookieStore', '$location', function($cookieStore, $location) {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'app/templates/components/banner/banner-half.html',
      link: function(scope, element, attrs) {
        scope.socialType = attrs.socialType;
        scope.socialClasses = attrs.socialClasses;
        
        scope.isSocialType = function(type) {
          return scope.socialType.toLowerCase() == type.toLowerCase();
        };

        scope.hasFacebookCookie = function() {
          return _.include($cookieStore.get('facebookShared'), $location.absUrl());
        };

        scope.hasTwitterCookie = function() {
          return _.include($cookieStore.get('twitterShared'), $location.absUrl());
        };

        scope.setTwitterChecked = function() {
          scope.twitterChecked = scope.hasTwitterCookie();
        };

        scope.setFacebookChecked = function() {
          scope.facebookChecked = scope.hasFacebookCookie();
        };

        scope.$on('facebookShared', function(event, cookie) {
          if (_.contains(cookie, $location.absUrl())) { scope.setFacebookChecked(); }
        });

        scope.$on('twitterShared', function(event, cookie) {
          if (_.contains(cookie, $location.absUrl())) { scope.setTwitterChecked(); }
        });

        scope.setFacebookChecked();
        scope.setTwitterChecked();

      }
    };
  }]);
