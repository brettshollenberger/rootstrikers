angular
  .module('app')
  .factory('userService', [
    '$resource',
    '$http',
    '$rootScope',
    '$cookieStore',
    function($resource, $http, $rootScope, $cookieStore) {
      var User = $resource('/api/user/:userID', { userID: '@id' },
      {
          update: {
            method: 'PUT'
          }
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
        }, createLoggedUser = function(user) {
          $rootScope.loggedUser = new User(user);
        }, destroyLoggedUser = function() {
          $rootScope.loggedUser = undefined;
        };
      return {
        newUser: function(args) {
          return new User(args);
        },
        update: function(getters, setters, cb) {
          return User.update(getters, setters, cb);
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
        ngGet: function(params, next) {
          User.get(params, next);
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
            createLoggedUser(user);
          });
        },
        login: function(user) {
          return $http.post('/auth/login/', user).success(function(user) {
          
            // add the logged in user to cookie storage
            $cookieStore.put('loggedUser', new User(user));
            createLoggedUser(user);
          });
        },
        logout: function() {
          $http.get('/auth/logout').success(function() {

            // remove the currently logged in user from cookie storage
            $cookieStore.remove('loggedUser');
            destroyLoggedUser();
          });
        },
        updateUser: function(user, cb) {
        
            user = new User(user);
        
            // save any changes made to the current user
            user.$save(function(user) {
              
              // add the logged in user to cookie storage
              $cookieStore.put('loggedUser', user);
              createLoggedUser(user);
              cb(user);
            }, function(err) {
              cb(err);
            });
        },
        hasAccess: function(type) {
          switch (type) {
            case 'isAdmin':
              return $rootScope.loggedUser && $rootScope.loggedUser.isAdmin;
            case 'isLogged':
              return !!$rootScope.loggedUser;
            default:
            return false;
          }
        }
      };
    }
  ]);
