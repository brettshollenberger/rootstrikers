angular
  .module('app')
  .filter('characters', function() {
    return function(text, characters) {
      return _.first(text, characters).join('') + _.chain(text.slice(characters).split(' ')).first().value() + "...";
    };
  });
