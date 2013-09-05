angular
  .module('app')
  .controller('emailEditController', [
    '$scope',
    'flash',
    '$routeParams',
    'emailService',
    '$location',
    function($scope, notification, $routeParams, emailAPI, $location) {
      var model;
      //User is only alowed to edit a email template
      if ($routeParams.emailID) {
        emailAPI.get($routeParams.emailID, function(email) {
          model = email;
          $scope.email = model;
        });
      } else {
        //Not found
        $location.url('/not-found');
      }

      //set the model on the scope so its filled by the form
      $scope.email = model;

      //Opions for body field
      $scope.tinymceOptions = {
        menubar: false,
        toolbar: "undo redo bold italic underline strikethrough alignleft aligncenter alignright alignjustify styleselect formatselect fontselect fontsizeselect cut copy paste bullist numlist outdent indent blockquote removeformat link image"
      };

      $scope.save = function() {
        model.$save(function(email, putResponseHeaders) {
          notification.pop({
            body: 'Your Email has been successfully saved',
            type: 'success'
          });
        });
      };
    }
  ]);