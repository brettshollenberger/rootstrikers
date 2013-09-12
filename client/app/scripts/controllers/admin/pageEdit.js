angular
  .module('app')
  .controller('pageEditController', [
    '$scope',
    'flash',
    '$routeParams',
    'pageService',
    '$location',
    function($scope, notification, $routeParams, pageAPI, $location) {
      var model;

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

          if ( !! !$routeParams.pageID) {
            notification.set({
              body: 'Your Page has been successfully saved',
              type: 'success'
            });
            $location.path('/admin/page/edit/' + page.id).replace();
          }
          notification.pop({
            body: 'Your Page has been successfully saved',
            type: 'success'
          });
        });
      };

      $scope.remove = function(id) {
        var sure = confirm('U sure?');
        if (sure) {
          model.$remove(function() {
            notification.set({
              body: 'Your Page has been successfully removed',
              type: 'success',
            });
            $location.path('/admin/pages').replace();
          });
        }
      };

      $scope.publish = function(status) {
        model.publish = status;
        model.$save(function(page, putResponseHeaders) {
          notification.pop({
            body: 'Your Page has been successfully ' + ((status) ? 'published' : 'unpublished'),
            type: 'success'
          });
        });
      };
    }
  ]);