angular
  .module('app')
  .directive('removeImage', function($interpolate) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/templates/components/removeImageButton.html',
      link: function(scope, element, attrs) {
        element.bind('click', function() {
          // Evaluate the passed value of the removeImage attribute,
          // and set its image and InkBlob properties to null.
          // In this way, we can create a reusable module that
          // allows us to pass a value, like "feature" or "project", into the
          // directive, and have it applied on the current scope. 
          scope.$eval(attrs.removeImage).image = null;
          scope.$eval(attrs.removeImage).InkBlob = null;
          scope.$apply();
        });
      }
    };
  });
