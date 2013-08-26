angular
  .module('app')
  .factory('userService', [
    '$resource',
    function($resource) {
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
        }, loggedUser;
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
        login: function(user) {
          loggedUser = user;
        },
        logout: function() {
          loggedUser = undefined;
        }
      };
    }
  ]);