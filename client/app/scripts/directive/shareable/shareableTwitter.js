angular
  .module('app')
  .directive('shareableTwitter', function() {
    return {
      restrict: 'A',
      // Load the shareable attributes in a slightly higher priority
      // than the main shareable module, so that all shareable
      // attributes are loaded in the main shareable link function
      priority: 1,
      replace: true,
      require: "^shareable",
      link: function(scope, element, attr, shareableController) {
        shareableController.addTwitter();
      }
    };
  });
