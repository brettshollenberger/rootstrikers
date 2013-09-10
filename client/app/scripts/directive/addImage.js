angular
  .module('app')
  .directive('addImage', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/templates/components/addImageButton.html',
      link: function(scope, element, attrs) {

        // Find ViewModel object using the string passed in as the addImage value:
        Model = scope.$eval(attrs.addImage);

        /////////////////////////////////////////////////////////////////////////
        ///////////////// Set default image here, or use null ///////////////////
        /////////////////////////////////////////////////////////////////////////
        defaultImage = "/app/images/axesbaxes.gif";
        /////////////////////////////////////////////////////////////////////////
        ///////////////// Set default image here, or use null ///////////////////
        /////////////////////////////////////////////////////////////////////////

        scope.imageEqualsDefaultImage = function() {
          return Model.image == defaultImage;
        };

        element.bind('click', function() {
          filepicker.setKey('ACoTSGXT4Rj2XWKKTZAaJz');
          filepicker.pick({
            'mimetype': "image/*"
          }, function(InkBlob) {
            //If there was an image already delete it 
            if (scope.feature.InkBlob) {
              scope.removeImage();
            }
            //Set the new image to the $scope.feature
            Model.image = InkBlob.url;
            Model.InkBlob = InkBlob;
            scope.$apply();
          });
        });
      }
    };
  });
