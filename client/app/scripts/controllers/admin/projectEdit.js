angular
  .module('app')
  .controller('projectEditController', [
    '$scope',
    '$routeParams',
    'projectService',
    function($scope, $routeParams, Project) {
      var project = new Project();

      //set the model on the scope so its filled by the form
      $scope.project = project;
      //Check for the ID to know if its an edit or a new
      if ($routeParams.projectID) {
        //Complements Template title of "Rootstriker Project"
        $scope.actionTitle = 'Edit';
      } else {
        $scope.actionTitle = 'New';
      }

      $scope.save = function() {
        project.$save();
      };
    }
  ]);