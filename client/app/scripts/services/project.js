angular
  .module('app')
  .factory('projectService', [
    '$resource',
    '$http',
    function($resource, $http) {
      var Project = $resource('/api/project/:projectID', { projectID: '@id' }, {
        active: {
          method: 'GET',
          url: '/api/project/active',
          isArray: true
        }
      });
      
      var projects = [];
      
      var getIndex = function(id) {
        var i;

        for (i = projects.length - 1; i >= 0; i -= 1) {
          if (projects[i].id == id) {
            return i;
          }
        }

        return -1;
      };
      
      Project.getById = function(id) {
        return $http.get('/api/project/' + id).then(function(response) {
            return response.data;
        });
      };
      
      Project.updateById = function(id, data) {
        return $http.post('/api/project/' + id, data).then(function(response) {
            return response.data;
        });
      };
      
      Project.newProject = function() {
        return new Project();
      };

      Project.getAll = function(filters, cb) {
        projects = Project.query(filters, function() {
          if (cb) {
            cb(projects);
          }
        });
        return projects;
      };

      Project.getActive = function() {
        return $http.get('/api/project/active').then(function(response) {
            return response.data;
        });
      };
      
      Project.getCompleted = function() {
        return $http.get('/api/project/completed').then(function(response) {
          return response.data;
        });
      };
        
      Project.getPublished = function(cb) {
        return this.getAll({
          publish: true
        }, cb);
      };
        
      Project.getBySlug = function(name) {

        var params = {
            query: JSON.stringify({slug: name})
        };

        return $http.get('/api/project/find', {params: params}).then(function(response) {
          return response.data[0];
        });
      };

      return Project;
    }
  ]);
