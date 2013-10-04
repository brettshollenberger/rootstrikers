angular
  .module('app')
  .factory('actionService', [
    '$http',
    '$resource',
    function($http, $resource) {
    
      var Action = $resource('/api/actions/:id',
        { id: '@id' }
      );
      
      Action.hasUserActed = function(project_id, user_id) {
        return $http.get('/api/actions/hasUserActed', {params:{'project_id':project_id, 'user_id':user_id}}).then(function(response) {
          if(response.status === 200 && response.data.length > 0) {
              return true;
          }
          return false;
        });
      };
      
      Action.getProjectActionUsers = function(project_id) {
        return $http.get('/api/projects/'+project_id+'/actions').then(function(response) {
          if(response.status === 200) {
              return response.data;
          }
          return false;
        });
      };
      
      return Action;
      
    }]);