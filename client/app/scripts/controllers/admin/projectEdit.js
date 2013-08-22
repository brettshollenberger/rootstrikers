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
      filepicker.setKey('ACoTSGXT4Rj2XWKKTZAaJz');

      var saveModel = function(silent) {
        $scope.flash = {
          show: false
        };
        model.$save(function(project, putResponseHeaders) {
          if (silent) {
            return;
          }

          $scope.flash = {
            message: 'Your Project has been successfully saved',
            type: 'success',
            show: true
          };

          //If there is no projectID
          if ( !! !$routeParams.projectID) {
            $rootScope.flash = $scope.flash;
            $location.path('/admin/project/edit/' + project.id).replace();
          }
        });
      };

      $scope.save = function() {
        var input = document.getElementById('image');

        if (input.value) {
          $scope.progress = 'Uploading Image';
          //We have an image store it
          filepicker.store(input, {
              access: 'public',
              path: '/project/'
            },
            function(InkBlob) {
              //If there was an image already delete it 
              if (model.InkBlob) {
                $scope.removeImage(model.InkBlob);
              }
              //Set the new image to the model
              model.image = InkBlob.url;
              model.InkBlob = InkBlob;

              //Save the modle
              saveModel();

              //Clear upload progress
              $scope.progress = '';
              //Clear file input
              input.value = '';
            }, function(FPError) {
              $scope.flash = {
                message: 'There has been an error uploading the image. Please try again',
                type: 'error',
                show: true
              };
            }, function(progress) {
              $scope.progress = "Loading: " + progress + "%";
            });
        } else {
          //I we dont have image just save the model
          saveModel();
        }
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

            $scope.flash = {
              message: 'The image has been removed',
              type: 'success',
              show: true
            };
          }
        }, function(err) {
          //171 -> image dont exist
          if (err.code === 171) {
            //If the image dont exist remove it from the model
            model.image = '';
            model.InkBlob = '';
            saveModel(true);
          }
          $scope.flash = {
            message: 'There have been a problem deleting your image',
            type: 'error',
            show: true
          };
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