angular
  .module('app', ['ngResource', 'ui.tinymce'])
  .config(['$routeProvider', '$httpProvider',
    function($router, $httpProvider) {
    
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
    
      $router
        .when('/', {
          controller: 'homeController',
          templateUrl: 'app/templates/home.html'
        })
        .when('/page/:url', {
          controller: 'pageController',
          templateUrl: 'app/templates/page.html'
        })
      //Temporary admin go to project List 
      .when('/admin', {
        controller: 'projectListController',
        templateUrl: 'app/templates/admin/projectList.html'
      })
        .when('/admin/projects', {
          controller: 'projectListController',
          templateUrl: 'app/templates/admin/projectList.html'
        })
      //New Project Route
      .when('/admin/project/new', {
        controller: 'projectEditController',
        templateUrl: 'app/templates/admin/projectForm.html'
      })
      //Edit Project Route
      .when('/admin/project/edit/:projectID', {
        controller: 'projectEditController',
        templateUrl: 'app/templates/admin/projectForm.html'
      })
      //Preview Project Route
      .when('/admin/project/preview/:projectID', {
        controller: 'projectEditController',
        templateUrl: 'app/templates/admin/projectPreview.html'
      })
      //Page List
      .when('/admin/pages', {
        controller: 'pageListController',
        templateUrl: 'app/templates/admin/pageList.html'
      })
      //New page Route
      .when('/admin/page/new', {
        controller: 'pageEditController',
        templateUrl: 'app/templates/admin/pageForm.html'
      })
      //Edit page Route
      .when('/admin/page/edit/:pageID', {
        controller: 'pageEditController',
        templateUrl: 'app/templates/admin/pageForm.html'
      })
      //Preview page Route
      .when('/admin/page/preview/:pageID', {
        controller: 'pageEditController',
        templateUrl: 'app/templates/admin/pagePreview.html'
      });
    }
  ]);