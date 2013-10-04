angular
  .module('app')
  .filter('chars120', function() {
    return function(text) {
      return _.first(text, 120).join('') + "...";
    };
  });
