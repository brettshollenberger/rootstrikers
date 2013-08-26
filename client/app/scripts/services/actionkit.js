angular
  .module('app')
  .factory('actionKitService', [
    '$http',
    function($http) {

      return {
        getBasic: function () {
            
            console.log('HOME APP...');
      
            var url = "https://act.demandprogress.org/rest/v1/user/?last_name=Smith&callback=JSON_CALLBACK";
        
            $http.jsonp(url)
            .success(function(data) {
                console.log(data);
            })
        }
      };
    }
  ]);