angular
  .module('app')
  .directive('formModal', ['$compile', '$templateCache',
    function($compile, $templateCache) {
      return {
        scope: {
          formObject: '=',
          formErrors: '=',
          title: '@',
          template: '@',
          okButtonText: '@',
          formSubmit: '&',
          formClear: '&'
        },
        compile: function(element, cAtts) {
          var $element, template = $templateCache.get('app/templates/formModal.html');

          return function(scope, element, lAtts) {
            $element = $($compile(template)(scope));

            scope.submit = function() {
              var result = scope.formSubmit();
              $element.modal('hide');
            };

            scope.close = function() {
              $element.modal('hide');
              scope.formClear();
            };

            element.on('click', function(e) {
              e.preventDefault();
              $element.modal('show');
            });
          };
        }
      };
    }
  ]);