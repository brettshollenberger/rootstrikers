angular
  .module('app')
  .directive('modal', ['$compile', '$templateCache', 'pageService',
    function($compile, $templateCache, pageAPI) {
      return {
        scope: true,
        compile: function(element, cAtts) {

          return function(scope, element, lAtts) {
          
            var $element, template;
            
            var bindClick = function() {
                element.on('click', function(e) {
                  e.preventDefault();
                  $element.modal('show');
                  angular.element(document.getElementById('wrap')).addClass('openModal');
                  scope.$parent.closeModal = function() {
                    $element.modal('hide');
                    angular.element(document.getElementById('wrap')).removeClass('openModal');
                  };
                });
            };
            
            // if this is a template modal
            if(cAtts.template) {
                $element = template = $templateCache.get(cAtts.template);
                $element = $($compile(template)(scope));
                bindClick();
            } 
            // else this is a page modal
            else if(cAtts.page) {
                
                $element = template = $templateCache.get("app/templates/partials/pageModal.html");
                
                pageAPI.getByURL(cAtts.page, function(err, res) {
                    if (!err) {
                        scope.modalView = res;
                        $element = $($compile(template)(scope));
                        bindClick();
                    }
                });
            }
            
          };
        }
      };
    }
  ]);