angular
  .module('app')
  .filter('linebreaker', function() {
    return function(text) {
      return text ? text.replace(/\n/, '<br>') : text;
    };
  });
