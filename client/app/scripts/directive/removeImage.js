angular
  .module('app')
  .directive('removeImage', function($interpolate) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/templates/components/removeImageButton.html',
      link: function(scope, element, attrs) {
        // Find ViewModel object using the string passed in as the addImage value:
        Model = scope.$eval(attrs.removeImage);

        element.bind('click', function() {
          // Evaluate the passed value of the removeImage attribute,
          // and set its image and InkBlob properties to null or a default
          // image value. In this way, we can create a reusable module that
          // allows us to pass a value, like "feature" or "project", into the
          // directive, and have it applied on the current scope. 
          Model.image = Model.defaultImage;
          Model.InkBlob = null;
          scope.$apply();
        });
      }
    };
  });
