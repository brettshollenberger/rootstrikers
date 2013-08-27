angular
  .module('app')
  .factory('actionKitService', [
    '$http',
    function($http) {
      
      var apiBase = 'https://act.demandprogress.org/rest/v1/';
      
      return {
      
        getPage: function (shortname) {
      
            var url = apiBase + "page/?name=" + shortname + "&callback=JSON_CALLBACK";
            
            return $http({method: 'JSONP', url: url}).
            then(function (response) {
                // if the page exists
                if(response.status === 200 && response.data.meta.total_count === 1) {
                    return response.data.objects[0];
                } else {
                    return false;
                }
            });    
        }
        
      };
    }
  ]);