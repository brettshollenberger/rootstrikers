angular
  .module('app', ['ngResource'])
  .config(['$routeProvider', function($router) {
    $router
      .when('/', {
        controller:   'homeController',
        templateUrl:  'app/templates/home.html'
      })
      //Temporary admin go to project List 
      .when('/admin', {
        controller:   'projectListController',
        templateUrl:  'app/templates/admin/projectList.html'
      })
      //New Project Route
      .when('/admin/project/new', {
        controller:   'projectEditController',
        templateUrl:  'app/templates/admin/projectForm.html'
      })
    ;
  }])
;
