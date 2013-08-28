angular
  .module('app')
  .directive('loginLink', [
    function() {
      return {
        replace: true,
        template: '<a href="#" modal template="app/templates/auth/login.html" title="Login" ok-button-text="Login" form-submit="login()" form-clear="clear()" form-object="formUser" form-errors="errors">Login</a>'
      };
    }
  ]);