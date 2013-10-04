angular
  .module('app')
  .filter('chars120', function() {
    return function(text) {
      return _.first(text, 120).join('') + _.chain(text.slice(120).split(' ')).first().value() + "...";
    };
  });
