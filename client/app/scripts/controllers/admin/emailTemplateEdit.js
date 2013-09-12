angular
  .module('app')
  .controller('emailEditController', [
    '$scope',
    'flash',
    '$routeParams',
    'emailService',
    '$location',
    function($scope, notification, $routeParams, emailAPI, $location) {
      var model, tmpl = function(str, data) {
          var fn = new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +

            // Introduce the data as local variables using with(){}
            "with(obj){p.push('" +

            // Convert the template into pure JavaScript
            str
            .replace(/[\r\t\n]/g, " ")
            .split("{{").join("\t")
            .replace(/((^|}})[^\t]*)'/g, "$1\r")
            .replace(/\t(.*?)}}/g, "',$1,'")
            .split("\t").join("');")
            .split("}}").join("p.push('")
            .split("\r").join("\\'") + "');}return p.join('');");

          return fn(data);
        };

      //User is only alowed to edit a email template
      if ($routeParams.emailID) {
        emailAPI.get($routeParams.emailID, function(email) {
          model = email;
          $scope.email = model;
          $scope.body = tmpl(model.body || '', $scope.test);
        });
      } else {
        //Not found
        $location.url('/not-found');
      }

      //set the model on the scope so its filled by the form
      $scope.email = model;
      $scope.test = {
        first_name: 'Jhon',
        last_name: 'Doe',
        email: 'jhon@doe.com',
        verification_link: $location.host() + '/verify/aseqwj12312nsk123',
        city: 'A City',
        state: 'The State',
        country: 'Country',
        avatar: 'http://placehold.it/400x400',
        thumb: 'http://placehold.it/200x200'

      };

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