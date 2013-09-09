angular
  .module('app')
  .directive('adminNavMenu', function($location) {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: 'app/templates/admin/partials/adminMenu.html',
      controller: ['$scope', '$routeParams',
      function($scope, $routeParams) {
        $scope.onAdmin = /\/admin/.test($location.path());
      }
    ]};
  });
