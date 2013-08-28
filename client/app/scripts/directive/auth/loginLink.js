angular
  .module('app')
  .directive('loginLink', [
    function() {
      return {
        replace: true,
        template: '<a href="#" modal template="app/templates/auth/login.html" title="Login">Login</a>'
      };
    }
  ]);