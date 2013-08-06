angular
  .module('app')
  .factory('projectService', [
    '$resource',
    function($resource) {
      var Project = $resource('/api/project/:projectID', {
        projectID: '@id'
      }),
        projects = [],
        getIndex = function(id) {
          var i;

          for (i = projects.length - 1; i >= 0; i -= 1) {
            if (projects[i].id == id) {
              return i;
            }
          }

          return -1;
        };
      return {
        newProject: function() {
          return new Project();
        },
        getAll: function(filters, cb) {
          projects = Project.query(function() {
            if (cb) {
              cb(projects);
            }
          });
          return projects;
        },
        get: function(id, cb) {
          var project, i;

          //If there is no callback I do nothing
          if (!cb) {
            return;
          }

          //If the project have been already fetch return that model
          i = getIndex(id);
          if (i >= 0 && cb) {
            cb(projects[i]);
          }

          //If not ask the server
          if (!project) {
            Project.get({
              projectID: id
            }, function(result) {
              cb(result);
            });
          }
        },
        remove: function(id, cb) {
          Project.remove({
            projectID: id
          }, function(result) {
            if (result) {
              projects.splice(getIndex(id), 1);
              if(cb){
                cb(projects);
              }
            }
          });
        }
      };
    }
  ]);