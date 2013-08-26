angular
  .module('app')
  .directive('registerLink', [
    function() {
      return {
        replace: true,
        template: '<a href="#" form-modal template="app/templates/auth/register.html" title="Register" ok-button-text="Register" form-submit="register()" form-clear="clear()" form-object="formUser" form-errors="errors">Register</a>'
      };
    }
  ]);