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
        //If a notification has been set on the root make it local and clear it
        $scope.flash = $rootScope.flash;
        $rootScope.flash = undefined;
      } else {
        //If there is no root notification create a local one that dont display
        $scope.flash = {
          show: false
        };
      }


      //Check for the ID to know if its an edit or a new
      if ($routeParams.projectID) {
        //Complements Template title of "Rootstriker Project"
        $scope.actionTitle = 'Edit';
        //get the project from the API
        projectAPI.get($routeParams.projectID, function(project) {
          model = project;
          $scope.project = model;
        });
      } else {
        //Create a new resource
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

          if (!!!$routeParams.projectAPI) {
            $rootScope.flash = $scope.flash;
            $location.path('/admin/project/edit/' + project.id).replace();
          }
        });
      };
    }
  ]);