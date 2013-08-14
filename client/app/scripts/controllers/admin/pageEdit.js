angular
  .module('app')
  .controller('pageEditController', [
    '$scope',
    '$rootScope',
    '$routeParams',
    'pageService',
    '$location',
    function($scope, $rootScope, $routeParams, pageAPI, $location) {
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
      if ($routeParams.pageID) {
        //Complements Template title of "Rootstriker page"
        $scope.actionTitle = 'Edit';
        pageAPI.get($routeParams.pageID, function(page) {
          model = page;
          $scope.page = model;
        });
      } else {
        model = pageAPI.newpage();
        $scope.actionTitle = 'New';
      }

      //set the model on the scope so its filled by the form
      $scope.page = model;

      $scope.save = function() {
        model.$save(function(page, putResponseHeaders) {
          $scope.flash = {
            message: 'Your Page has been successfully saved',
            type: 'success',
            show: true
          };

          if ( !! !$routeParams.pageID) {
            $rootScope.flash = $scope.flash;
            $location.path('/admin/page/edit/' + page.id).replace();
          }
        });
      };

      $scope.remove = function(id) {
        var sure = confirm('U sure?');
        if (sure) {
          model.$remove(function() {
            $scope.flash = {
              message: 'Your Page has been successfully removed',
              type: 'success',
              show: true
            };
            $location.path('/admin').replace();
          });
        }
      };

      $scope.publish = function(status) {
        model.publish = status;
        model.$save(function(page, putResponseHeaders) {
          $scope.flash = {
            message: 'Your Page has been successfully ' + ((status) ? 'published' : 'unpublished'),
            type: 'success',
            show: true
          };
        });
      };
    }
  ]);