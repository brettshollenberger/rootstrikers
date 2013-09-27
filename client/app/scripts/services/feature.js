angular
  .module('app')
  .factory('featureService', [
    '$http',
    '$resource',
    function($http, $resource) {
      var Feature = $resource('/api/features/:id',
        { id: '@id' },
        {
          update: {
            method: 'PUT'
          }
        }
      );
      Feature.getPublished = function() {
        return $http.get('/api/features/published').then(function(response) {
          return response.data;
        });
      };
      return Feature;
    }]);
