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
        
      Project.get = function(id, cb) {
        var project, i;

        //If there is no callback I do nothing
        if (!cb) {
          return;
        }

        //If the project have been already fetch return that model
        i = getIndex(id);
        if (i >= 0 && cb) {
          project = projects[i];
          cb(project);
        }

        //If not ask the server
        if (!project) {
          Project.get({
            projectID: id
          }, function(result) {
            cb(result);
          });
        }
      };

      Project.remove = function(id, cb) {
        Project.remove({
          projectID: id
        }, function(result) {
          if (result) {
            if (projects.length && getIndex(id) >= 0) {
              projects.splice(getIndex(id), 1);
            }
            if (cb) {
              cb(projects);
            }
          }
        });
      };
        
      Project.getPublished = function(cb) {
        //If we have fetched the project from the backend just return the published
        if (projects.length) {
          return projects.filter(function(element, index, array) {
            return element.publish;
          });
        } else {
          //fetch the published only
          return this.getAll({
            publish: true
          }, cb);
        }
      };
        
      Project.getBySlug = function(name, cb) {
        var respond = function(results) {
          if (results.length) {
            if (cb) {
              cb(undefined, results[0]);
            }
          } else {
            if (cb) {
              cb("Not Found");
            }
          }
        };
          
        // If we have fetched the project from the backend just return the published
        if (projects.length) {
          respond(projects.filter(function(element, index, array) {
            return element.slug === name;
          }));
        } else {
          // fetch the project to the server
          this.getAll({
            slug: name
          }, function(result) {
            respond(result);
          });
        }
      };

      return Project;
    }
  ]);
