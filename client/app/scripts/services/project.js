angular
  .module('app')
  .factory('projectService', [
    '$resource',
    function($resource) {
      return $resource('/api/project/:projectID');
    }
  ]);