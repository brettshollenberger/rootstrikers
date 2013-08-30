angular
  .module('app')
  .factory("Facebook", ['$rootScope', '$q',
    function($rootScope, $q) {
      var getUserInfo = function(token, cb) {
        FB.api('/me?access_token' + token, function(response) {
          cb(response);
        });
      };
      return {
        login: function() {
          var deferred = $q.defer();
          FB.getLoginStatus(
            function(loginStatusResponse) {
              switch (loginStatusResponse.status) {
                case "connected":
                  getUserInfo(loginStatusResponse.authResponse.accessToken, function(response) {
                    setTimeout(function() {
                      $rootScope.$apply(function() {
                        deferred.resolve(response);
                      }, 1);
                    });
                  });
                  break;
                default:
                  FB.login(function(response) {
                    setTimeout(function() {
                      if (response.status === 'not_authorized') {
                        $rootScope.$apply(function() {
                          deferred.reject();
                        });
                      } else {
                        getUserInfo(response.authResponse.accessToken, function(user) {
                          $rootScope.$apply(function() {
                            deferred.resolve(user);
                          });
                        });
                      }
                    }, 1);
                  }, {
                    scope: 'email'
                  });
                  break;
              }
            });
          return deferred.promise;
        },
        logout: function() {

          var deferred = $q.defer();

          FB.logout(function(response) {
            setTimeout(function() {
              $rootScope.$apply(function() {
                deferred.resolve(response.authResponse);
              });
            }, 1);
          });

          return deferred;
        }
      };
    }
  ]);