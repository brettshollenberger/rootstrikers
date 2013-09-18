angular
  .module('app')
  .controller('projectEditController', [
    '$scope',
    'flash',
    '$routeParams',
    'projectService',
    '$location',
    'MetaMachine',
    function($scope, notification, $routeParams, projectAPI, $location, MetaMachine) {
      var model;

      //Check for the ID to know if its an edit or a new
      if ($routeParams.projectID) {
        //Complements Template title of "Rootstriker Project"
        $scope.actionTitle = 'Edit';
        //get the project from the API
        projectAPI.get($routeParams.projectID, function(project) {
          model = project;
          $scope.project = model;
          MetaMachine.title("Editing: " + $scope.project.name, "Admin");
        });
      } else {
        //Create a new resource
        model = projectAPI.newProject();
        $scope.actionTitle = 'New';
        MetaMachine.title("New Project", "Admin");
      }

      //set the model on the scope so its filled by the form
      $scope.project = model;
      //And for preview
      $scope.item = model;

      // TinyMCE override options
      $scope.tinymceOptions = {
          plugins: "paste,code",
          paste_remove_styles: true
      };

      var saveModel = function(silent) {
        model.$save(function(project, putResponseHeaders) {
          if (silent) {
            return;
          }

          //If there is no projectID
          if ( !! !$routeParams.projectID) {
            notification.set({
              body: 'Your Project has been successfully saved',
              type: 'success'
            });
            $location.path('/admin/project/edit/' + project.id).replace();
          }
          notification.pop({
            body: 'Your Project has been successfully saved',
            type: 'success'
          });
        });
      };

      $scope.selectImage = function() {
        filepicker.setKey('ACoTSGXT4Rj2XWKKTZAaJz');
        filepicker.pick({
          'mimetype': "image/*"
        }, function(InkBlob) {
          //If there was an image already delete it 
          if (model.InkBlob) {
            $scope.removeImage(model.InkBlob);
          }
          //Set the new image to the model
          model.image = InkBlob.url;
          model.InkBlob = InkBlob;
          $scope.$digest();
        });
      };

      $scope.save = function() {
        saveModel();
      };

      $scope.removeImage = function(blob) {
        //If we dont have the blob take the actual image
        var InkBlob = blob || model.InkBlob;

        if (!InkBlob) {
          return;
        }
        //If its an string convert it to json
        if (angular.isString(InkBlob)) {
          InkBlob = JSON.parse(InkBlob);
        }

        filepicker.remove(InkBlob, function() {
          //If its the same as the actual model lets remove it
          if (InkBlob.url === model.image) {
            //Set as empty field so its updated on the db
            model.image = '';
            model.InkBlob = '';
            //Save without notification
            saveModel(true);

            notification.pop({
              body: 'The image has been removed',
              type: 'success'
            });
          }
        }, function(err) {
          //171 -> image dont exist
          if (err.code === 171) {
            //If the image dont exist remove it from the model
            model.image = '';
            model.InkBlob = '';
            saveModel(true);
          }
          notification.pop({
            body: 'There have been a problem deleting your image',
            type: 'error'
          });
        });
      };

      $scope.remove = function(id) {
        var sure = confirm('U sure?');
        if (sure) {
          model.$remove(function() {
            notification.set({
              body: 'Your Project has been successfully removed',
              type: 'success'
            });
            $location.path('/admin').replace();
          });
        }
      };

      $scope.publish = function(status) {
        model.publish = status;
        model.$save(function(project, putResponseHeaders) {
          notification.pop({
            body: 'Your Project has been successfully ' + ((status) ? 'published' : 'unpublished'),
            type: 'success'
          });
        });
      };
    }
  ]);
