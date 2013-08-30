angular
  .module('app')
  .directive('registerLink', [
    function() {
      return {
        replace: true,
        template: '<a href="#" modal template="app/templates/auth/register.html" title="Register">Register</a>'
      };
    }
  ]);