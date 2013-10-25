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
      
      Project.parseActionkit = function(project, actionkit) {
        project.actionkit = actionkit;
        project.title = actionkit.title;
        project.sub_title = actionkit.petitionForm.statement_leadin;
        project.problem = actionkit.petitionForm.about_text;
        project.action = actionkit.petitionForm.statement_text;
        project.goal = actionkit.goal;
        
        if(project.actionkit.goal_type === 'actions') {
            project.actionsNeeded = project.actionkit.goal;
        }
        
        return project;
      };

      return Project;
    }
  ]);
