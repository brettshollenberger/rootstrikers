angular
  .module('app')
  .factory('featureService', [
    '$resource',
    function($resource) {
      return $resource('/api/features/:id',
        { id: '@id' },
        {
          update: {
            method: 'PUT'
          }
        }
      );
    }]);
