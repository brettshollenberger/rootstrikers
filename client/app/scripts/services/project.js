angular
  .module('app')
  .factory('projectService', [
    '$resource',
    function($resource) {
      var Project = $resource('/api/project/:projectID', {
        projectID: '@id'
      }),
        projects = [];
      return {
        newProject: function() {
          return new Project();
        },
        getAll: function(filters, cb) {
          projects = Project.query(function() {
            if (cb) {
              cb();
            }
          });
          return projects;
        },
        get: function(id, cb) {
          var project, i;

          //If the project have been already fetch return that model
          for (i = projects.length - 1; i >= 0; i -= 1) {
            if (projects[i].id == id) {
              if (cb) {
                cb(projects[i]);
              }
              return;
            }
          }

          //If not ask the server
          if (!project) {
            Project.get({
              projectID: id
            }, function(result) {
              if (cb) {
                cb(result);
              }
            });
          }
        }
      };
    }
  ]);