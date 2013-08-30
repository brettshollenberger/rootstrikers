angular
.module('app')
.directive('validpage', ['actionKitService', function(actionKitService) {
  
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      
        ctrl.$parsers.unshift(function(viewValue) {
          
          if(viewValue !== '') {
          
              actionKitService.getPage(viewValue).then(function (response) {
                
                if(response !== false) {
                    ctrl.$setValidity('validpage', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('validpage', false);
                    return undefined;
                }
            });
        } else {
            ctrl.$setValidity('validpage', true);
            return viewValue;
        }
      });
    }
  };
}]);