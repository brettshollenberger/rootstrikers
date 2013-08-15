angular
  .module('app')
  .controller('pageController', [
    '$scope',
    '$routeParams',
    'pageService',
    function($scope, $routeParams, pageAPI) {
      pageAPI.getByURL($routeParams.url, function(err, res) {
        if (err) {
          //Error page
          $scope.page = {
            header: 'Ops we cant find the page that you requested',
            body: 'Error 404 page Not Found'
          };
        } else {
          $scope.page = res;
        }
      });
    }
  ]);