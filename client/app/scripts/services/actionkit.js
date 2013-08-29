angular
  .module('app')
  .factory('actionKitService', [
    '$http',
    function($http) {
      
      return {
      
        createUser: function (user) {
            
            //console.log('ENTER CREATE USER');
            
            var url = '/api/actionkit/createUser';
            
            return $http({method: 'POST', url: url, data:user}).
            then(function (response) {
            
              //console.log('RESPONSE');
              //console.log(response);
              
              if(response.status === 200) {
                  return response.data;
              } else {
                  return false;
              }
                
            }, function() {
                return false;
            });  
            
        },
      
        getPage: function (shortname) {      
        
            var url = '/api/actionkit/getPage';
            
            return $http({method: 'GET', url: url, params:{'shortname':shortname}}).
            then(function(response) {

              if(response.status === 200) {
                  return response.data;
              } else {
                  return false;
              }
              
            }, function() {
                return false;
            });
        }
        
      };
    }
  ]);