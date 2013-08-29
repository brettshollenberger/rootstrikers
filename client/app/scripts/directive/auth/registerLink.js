angular
  .module('app')
  .directive('registerLink', [
    function() {
      return {
        replace: true,
        template: '<a href="#" class="btn" id="join" form-modal template="app/templates/auth/register.html" title="Join" ok-button-text="Join" form-submit="register()" form-clear="clear()" form-object="formUser" form-errors="errors">Join</a>'
      };
    }
  ]);