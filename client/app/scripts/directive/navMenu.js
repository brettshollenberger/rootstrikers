angular
  .module('app')
  .directive('navMenu', function($location) {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: 'app/templates/partials/menu.html',
      controller: ['$scope', '$routeParams', 'pageService',
        function($scope, $routeParams, pageAPI) {
          $scope.onAdmin = /\/admin/.test($location.path());
          $scope.pages = pageAPI.getPublished();
        }
      ],
      link: function postLink(scope, iElement, iAttrs) {
        var links, link,
          currentLink,
          urlMap = {},
          i;

        scope.$watch('pages', function() {
          links = iElement.find('a');
          for (i = 0; i < links.length; i += 1) {
            link = angular.element(links[i]);
            urlMap[link.attr('href')] = link;
          }
        });

        scope.$on('$routeChangeStart', function() {
          var pathLink = urlMap[$location.path()];
          scope.onAdmin = /\/admin/.test($location.path());

          if (pathLink) {
            if (currentLink) {
              currentLink.parent().removeClass('active');
            }
            currentLink = pathLink;
            currentLink.parent().addClass('active');
          }
        });
      }
    };
  });