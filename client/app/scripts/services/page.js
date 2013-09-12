angular
  .module('app')
  .factory('pageService', [
    '$resource',
    function($resource) {
      var Page = $resource('/api/page/:pageID', {
        pageID: '@id'
      }),
        pages = [],
        getIndex = function(id) {
          var i;

          for (i = pages.length - 1; i >= 0; i -= 1) {
            if (pages[i].id == id) {
              return i;
            }
          }

          return -1;
        };
      return {
        newpage: function() {
          return new Page();
        },
        getAll: function(filters, cb) {
          pages = Page.query(filters, function() {
            if (cb) {
              cb(pages);
            }
          });
          return pages;
        },
        get: function(id, cb) {
          var page, i;

          //If there is no callback I do nothing
          if (!cb) {
            return;
          }

          //If the page have been already fetch return that model
          i = getIndex(id);
          if (i >= 0 && cb) {
            page = pages[i];
            cb(page);
          }

          //If not ask the server
          if (!page) {
            Page.get({
              pageID: id
            }, function(result) {
              cb(result);
            });
          }
        },
        remove: function(id, cb) {
          Page.remove({
            pageID: id
          }, function(result) {
            if (result) {
              if (pages.length && getIndex(id) >= 0) {
                pages.splice(getIndex(id), 1);
              }
              if (cb) {
                cb(pages);
              }
            }
          });
        },
        getPublished: function(cb) {
          var published;
          //If we have fetched the page from the backend just return the published
          if (pages.length) {
            published = pages.filter(function(element, index, array) {
              return element.publish;
            });
            cb(published);
            return published;
          } else {
            //fetch the published only
            return this.getAll({
              publish: true
            }, cb);
          }
        },
        getByURL: function(url, cb) {
          var respond = function(results) {
            if (results.length) {
              if (cb) {
                cb(undefined, results[0]);
              }
            } else {
              if (cb) {
                cb("Not Found");
              }
            }
          };
          //If we have fetched the page from the backend just return the published
          if (pages.length) {
            respond(pages.filter(function(element, index, array) {
              return element.url === url;
            }));
          } else {
            //fetch the page to the server
            this.getAll({
              url: url
            }, function(result) {
              respond(result);
            });
          }
        }
      };
    }
  ]);