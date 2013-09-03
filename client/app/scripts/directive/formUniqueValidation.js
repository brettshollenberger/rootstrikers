angular
  .module('app')
  .directive('ngUnique', ['$http',
    function(async) {
      return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {
          elem.on('blur', function(evt) {
            scope.$apply(function() {
              var data = {}, ajaxConfiguration,
                entity = attrs.ngUnique.split('.');

              data[entity[1]] = elem.val();
              ajaxConfiguration = {
                method: 'POST',
                url: '/api/'+ entity[0] +'/chekUnique',
                data: data
              };
              async(ajaxConfiguration)
                .success(function(data, status, headers, config) {
                  ctrl.$setValidity('unique', data.unique);
                });
            });
          });
        }
      };
    }
  ]);