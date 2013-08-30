angular
  .module('app')
  .factory('userService', [
    '$resource',
    '$http',
    '$rootScope',
    function($resource, $http, $rootScope) {
      var User = $resource('/api/user/:userID', {
        userID: '@id'
      }),
        users = [],
        getIndex = function(id) {
          var i;

          for (i = users.length - 1; i >= 0; i -= 1) {
            if (users[i].id == id) {
              return i;
            }
          }

          return -1;
        }, updateUser = function(user) {
          $rootScope.loggedUser = user;
        };
      return {
        newUser: function() {
          return new User();
        },
        getAll: function(filters, cb) {
          users = User.query(filters, function() {
            if (cb) {
              cb(users);
            }
          });
          return users;
        },
        get: function(id, cb) {
          var user, i;

          //If there is no callback I do nothing
          if (!cb) {
            return;
          }

          //If the user have been already fetch return that model
          i = getIndex(id);
          if (i >= 0 && cb) {
            cb(users[i]);
          }

          //If not ask the server
          if (!user) {
            User.get({
              userID: id
            }, function(result) {
              cb(result);
            });
          }
        },
        remove: function(id, cb) {
          User.remove({
            userID: id
          }, function(result) {
            if (result) {
              if (users.length && getIndex(id) >= 0) {
                users.splice(getIndex(id), 1);
              }
              if (cb) {
                cb(users);
              }
            }
          });
        },
        facebookLogin: function(fbUser) {
          var user = new User(),
            loc;
          user.fbID = fbUser.id;
          user.first_name = fbUser.first_name;
          user.last_name = fbUser.last_name;
          user.email = fbUser.email;
          if (fbUser.location) {
            loc = fbUser.location.name.split(',');
            switch (loc.length) {
              case 1:
                user.country = loc[0];
                break;
              case 2:
                user.city = loc[0];
                user.country = loc[1];
                break;
            }
          }
          user.avatar = "http://graph.facebook.com/" + fbUser.id + "/picture";
          user.isFacebook = true;
          user.isVerify = fbUser.verified;
          user.$save(function(user) {
            updateUser(user);
          });
        },
        login: function(user) {
          return $http.post('/auth/login/', user).success(function(user_response_object) {
            updateUser(user_response_object);
          });
        },
        logout: function() {
          $http.get('/auth/logout').success(function() {
            updateUser();
          });
        }
      };
    }
  ]);
