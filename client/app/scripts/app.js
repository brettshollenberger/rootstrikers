angular
  .module('app', ['ngResource', 'ui.tinymce', 'md5', 'ui-gravatar', 'ngCookies', 'ui.bootstrap', 'ngSanitize'])
  .config(['$routeProvider', '$httpProvider', '$locationProvider',
    function($router, $httpProvider, $location) {

      $location.hashPrefix('!');

      // allow for CORS
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];

      $router
        .when('/', {
          controller: 'homeController',
          templateUrl: 'app/templates/home.html'
        })
        .when('/project/:name', {
          controller: 'projectController',
          templateUrl: 'app/templates/projectPage.html'
        })
        .when('/page/:url', {
          controller: 'pageController',
          templateUrl: 'app/templates/page.html'
        })
        .when('/features/:id', {
          controller: 'featureShowController',
          templateUrl: 'app/templates/features/show.html'
        })

      //Admin
      .when('/admin', {
        controller: 'projectListController',
        templateUrl: 'app/templates/admin/projectList.html',
        access: 'isAdmin'
      })
        .when('/admin/projects', {
          controller: 'projectListController',
          templateUrl: 'app/templates/admin/projectList.html',
          access: 'isAdmin'
        })
      //New Project Route
      .when('/admin/project/new', {
        controller: 'projectEditController',
        templateUrl: 'app/templates/admin/projectForm.html',
        access: 'isAdmin'
      })
      //Edit Project Route
      .when('/admin/project/edit/:projectID', {
        controller: 'projectEditController',
        templateUrl: 'app/templates/admin/projectForm.html',
        access: 'isAdmin'
      })
      //Preview Project Route
      .when('/admin/project/preview/:projectID', {
        controller: 'projectEditController',
        templateUrl: 'app/templates/admin/projectPreview.html',
        access: 'isAdmin'
      })
      //Page List
      .when('/admin/pages', {
        controller: 'pageListController',
        templateUrl: 'app/templates/admin/pageList.html',
        access: 'isAdmin'
      })
      //New page Route
      .when('/admin/page/new', {
        controller: 'pageEditController',
        templateUrl: 'app/templates/admin/pageForm.html',
        access: 'isAdmin'
      })
      //Edit page Route
      .when('/admin/page/edit/:pageID', {
        controller: 'pageEditController',
        templateUrl: 'app/templates/admin/pageForm.html',
        access: 'isAdmin'
      })
      //Preview page Route
      .when('/admin/page/preview/:pageID', {
        controller: 'pageEditController',
        templateUrl: 'app/templates/admin/pagePreview.html',
        access: 'isAdmin'
      })
      //Features Index Action
      .when('/admin/features', {
        controller: 'featureIndexController',
        templateUrl: 'app/templates/admin/features/index.html'
      })
      //Features New Action
      .when('/admin/features/new', {
        controller: 'featureNewController',
        templateUrl: 'app/templates/admin/features/new.html'
      })
      //Features Edit Action
      .when('/admin/features/:id/edit', {
        controller: 'featureEditController',
        templateUrl: 'app/templates/admin/features/edit.html'
      })
      //Email Templates List
      .when('/admin/emails', {
        controller: 'emailListController',
        templateUrl: 'app/templates/admin/emailList.html',
        access: 'isAdmin'
      })
      //Edit email Template
      .when('/admin/email/edit/:emailID', {
        controller: 'emailEditController',
        templateUrl: 'app/templates/admin/emailForm.html',
        access: 'isAdmin'
      })
      //Preview email Template
      .when('/admin/email/preview/:emailID', {
        controller: 'emailEditController',
        templateUrl: 'app/templates/admin/emailPreview.html',
        access: 'isAdmin'
      });
    }
  ])
  .run(['$location', '$rootScope', '$cookieStore', 'userService', function($location, $rootScope, $cookieStore, userService) {
        
        // Set location object for use throughout applications
        $rootScope.location = $location;

        // get loggedUser cookie and set it to $rootScope.loggedUser
        $rootScope.loggedUser = $cookieStore.get('loggedUser');

        //Check for routes with access restriction
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
          if (next.access) {
            if (!userService.hasAccess(next.access)) {
              $location.path('/');
            }
          }
        });
        
        // update the loggedUser cookie everytime the current logged user is updated
        $rootScope.$watch('loggedUser', function(newValue, oldValue) {
            $cookieStore.put('loggedUser', newValue);
        });
      
        // Handle updating page title
        $rootScope.$on('$routeChangeSuccess', function($event, $route, $previousRoute) {
            
            $rootScope.pageSlug = "";
            
            var pageSlug = $location.path().split('/');
            
            // remove the first element, which is always ""
            pageSlug.shift();
            
            if(pageSlug.length === 1 && pageSlug[0] === "") {
                $rootScope.pageSlug = 'home';
            } else {
                
                angular.forEach(pageSlug, function(item) {
                    $rootScope.pageSlug += item + " "; 
                });
            }
        });      
  }]);
