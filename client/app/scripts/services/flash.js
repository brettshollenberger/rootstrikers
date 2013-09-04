angular
  .module('app')
  .factory('flash', function($rootScope) {
    var queue = [],
      currentMessage = {};

    $rootScope.$on('$routeChangeSuccess', function() {
      if (queue.length > 0)
        currentMessage = queue.shift();
      else
        currentMessage = {};
    });

    return {
      set: function(message) {
        var msg = message;
        queue.push(msg);

      },
      get: function(message) {
        return currentMessage;
      },
      pop: function(message) {
        $rootScope.$broadcast('flash', message);
      }
    };
  });