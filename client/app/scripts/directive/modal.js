angular
  .module('app')
  .directive('modal', ['$compile', '$templateCache',
    function($compile, $templateCache) {
      return {
        scope: true,
        compile: function(element, cAtts) {

          return function(scope, element, lAtts) {
          var $element, template = $templateCache.get(cAtts.template);
            $element = $($compile(template)(scope));

            element.on('click', function(e) {
              e.preventDefault();
              $element.modal('show');
              scope.$parent.closeModal = function() {
                $element.modal('hide');
              };
            });
          };
        }
      };
    }
  ]);