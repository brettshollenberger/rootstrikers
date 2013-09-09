angular
  .module('app', ['ngResource', 'ui.tinymce', 'md5', 'ui-gravatar', 'ngCookies'])
  .config(['$routeProvider', '$httpProvider',
    function($router, $httpProvider) {
    
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
      .when('/terms', {
        controller: 'termsController',
        templateUrl: 'app/templates/terms.html'
      });
    }
  ])
  .run(['$location', '$rootScope', '$cookieStore', function($location, $rootScope, $cookieStore) {
        
        // Set location object for use throughout applications
        $rootScope.location = $location;

        // get loggedUser cookie and set it to $rootScope.loggedUser
        $rootScope.loggedUser = $cookieStore.get('loggedUser');
      
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
