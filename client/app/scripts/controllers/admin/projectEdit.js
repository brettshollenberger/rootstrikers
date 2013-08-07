angular
  .module('app')
  .controller('projectEditController', [
    '$scope',
    '$rootScope',
    '$routeParams',
    'projectService',
    '$location',
    function($scope, $rootScope, $routeParams, projectAPI, $location) {
      var model;

      //Temporary notifiaction system
      if ($rootScope.flash) {
        $scope.flash = $rootScope.flash;
        $rootScope.flash = undefined;
      } else {
        $scope.flash = {
          show: false
        };
      }


      //Check for the ID to know if its an edit or a new
      if ($routeParams.projectID) {
        //Complements Template title of "Rootstriker Project"
        $scope.actionTitle = 'Edit';
        projectAPI.get($routeParams.projectID, function(project) {
          model = project;
          $scope.project = model;
        });
      } else {
        model = projectAPI.newProject();
        $scope.actionTitle = 'New';
      }

      //set the model on the scope so its filled by the form
      $scope.project = model;

      $scope.save = function() {
        model.$save(function(project, putResponseHeaders) {
          $scope.flash = {
            message: 'Your Project has been successfully saved',
            type: 'success',
            show: true
          };

          if ( !! !$routeParams.projectID) {
            $rootScope.flash = $scope.flash;
            $location.path('/admin/project/edit/' + project.id).replace();
          }
        });
      };

      $scope.remove = function(id) {
        var sure = confirm('U sure?');
        if (sure) {
          model.$remove(function() {
            $scope.flash = {
              message: 'Your Project has been successfully removed',
              type: 'success',
              show: true
            };
            $location.path('/admin').replace();
          });
        }
      };

      $scope.publish = function(status) {
        model.publish = status;
        model.$save(function(project, putResponseHeaders) {
          $scope.flash = {
            message: 'Your Project has been successfully ' + ((status) ? 'published' : 'unpublished'),
            type: 'success',
            show: true
          };
        });
      };
    }
  ]);