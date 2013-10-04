angular
  .module('app')
  .factory('flash', function($rootScope) {
    //Not a big deal of notification but now with the logic on the factory and directive we can improve it
    var queue = [],
      currentMessage,
      pop = function(message) {
        $rootScope.$broadcast('flash', message);
      };

    //Listen to rout change to send message if there is one saved
    $rootScope.$on('$routeChangeSuccess', function() {
      if (queue.length > 0) {
        currentMessage = queue.shift();
      } else {
        currentMessage = false;
      }
    });

    return {
      //Set notification for future brodcast
      set: function(message) {
        queue.push(message);
      },
      get: function() {
        if(currentMessage){
          return currentMessage;
        }else{
          return false;
        }
      },
      //Show a notification
      pop: pop
    };
  });