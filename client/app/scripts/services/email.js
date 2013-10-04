angular
  .module('app')
  .factory('emailService', [
    '$resource',
    function($resource) {
      var Email = $resource('/api/email/:emailID', {
        emailID: '@id'
      }),
        emails = [],
        getIndex = function(id) {
          var i;
          for (i = emails.length - 1; i >= 0; i -= 1) {
            if (emails[i].id == id) {
              return i;
            }
          }
          return -1;
        };
      return {
        getAll: function(filters, cb) {
          emails = Email.query(filters, function() {
            if (cb) {
              cb(emails);
            }
          });
          return emails;
        },
        get: function(id, cb) {
          var email, i;

          //If there is no callback I do nothing
          if (!cb) {
            return;
          }

          //If the email have been already fetch return that model
          i = getIndex(id);
          if (i >= 0 && cb) {
            email = emails[i];
            cb(email);
          }

          //If not ask the server
          if (!email) {
            Email.get({
              emailID: id
            }, function(result) {
              cb(result);
            });
          }
        }
      };
    }
  ]);