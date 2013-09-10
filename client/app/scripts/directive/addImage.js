angular
  .module('app')
  .directive('addImage', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/templates/components/addImageButton.html',
      link: function(scope, element, attrs) {
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
            scope.$eval(attrs.addImage).image = InkBlob.url;
            scope.$eval(attrs.addImage).InkBlob = InkBlob;
            scope.$apply();
          });
        });
      }
    };
  });
