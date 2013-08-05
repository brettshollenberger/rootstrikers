angular
  .module('app')
  .controller('projectEditController', [
    '$scope',
    '$rootScope',
    '$routeParams',
    'projectService',
    function($scope, $rootScope, $routeParams, projectAPI) {
      var model;

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
        model.$save();
      };
    }
  ]);