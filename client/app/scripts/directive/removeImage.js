angular
  .module('app')
  .directive('removeImage', function($interpolate) {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        removeImage: '='
      },
      templateUrl: 'app/templates/components/removeImageButton.html',
      link: function(scope, element, attrs) {

        // The removeImage attribute of our directive is intended to set 
        // the name of the model attribute that exists on the scope that
        // we're going to tap into. 
        Model = scope.removeImage;

        // If no defaultImg attr is set, we fall back on undefined
        // because in Javascript trying to access a non-existent 
        // property on an object returns undefined.
        defaultImage = attrs.defaultImg || undefined;

        // In Edit context, the model may already have an image set. 
        if (!Model.image) {
          Model.image = defaultImage;
        }

        // Whether the defautImg is an actual image or undefined,
        // if the two are set to the same thing, we'll want to use this
        // helper method in the DOM to display the Remove Image button 
        // instead of the Add Image button.
        scope.imageEqualsDefaultImage = function() {
          console.log(Model.image == defaultImage);
          return Model.image == defaultImage;
        };

        element.bind('click', function() {
          // Evaluate the passed value of the removeImage attribute,
          // and set its image and InkBlob properties to null or a default
          // image value. In this way, we can create a reusable module that
          // allows us to pass a value, like "feature" or "project", into the
          // directive, and have it applied on the current scope. 
          Model.image = defaultImage;
          Model.InkBlob = null;
          scope.$apply();
        });
      }
    };
  });
