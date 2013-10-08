angular
  .module('app')
  .directive('adminNavMenu', function($location) {
    return {
      restrict: 'EA',
      replace: true,
      scope: true,
      templateUrl: 'app/templates/admin/partials/adminMenu.html',
      controller: ['$scope', '$routeParams',
      function($scope, $routeParams) {
        $scope.$on('$routeChangeSuccess', function($event, $route, $previousRoute) {
            $scope.onAdmin = /\/admin/.test($location.path());
        });
      }
    ]};
  });