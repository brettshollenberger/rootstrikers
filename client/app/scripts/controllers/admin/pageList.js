angular
  .module('app')
  .controller('pageListController', [
    '$scope',
    'pageService',
    function($scope, pageAPI) {
      $scope.pages = pageAPI.getAll();

      $scope.remove = function(id) {
        var sure = confirm('U sure?');
        if (sure) {
          pageAPI.remove(id, function(pages) {
            $scope.pages = pages;
          });
        }
      };

      $scope.publish = function(id, status) {
        pageAPI.get(id, function(page) {
          page.publish = status;
          page.$save();
        });
      };
    }
  ]);