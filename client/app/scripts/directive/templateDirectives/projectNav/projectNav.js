angular
  .module('app')
  .directive('projectNav',
    ['$location', '$timeout',
    function($location, $timeout) {
      return {
        restrict: 'EA',
        scope: {},
        templateUrl: 'app/templates/components/projectNav/projectNav.html',
        replace: false,
        controller: ['$scope', 'projectService', '$routeParams', function($scope, projectService, $routeParams) {
          (function projectNavConstructor(t) {
            projectService.getPublished(function(result) {
              $scope.projects = result;
              this.projects = $scope.projects;

              $scope.currentProject = _.find($scope.projects, function(project) {
                return project.slug == $routeParams.name;
              });

              $scope.displayedProject = $scope.currentProject;
            });
          })(this);
        }],
        link: function(scope, element, attrs) {

          function safeApply() {
            $timeout(function() {
              scope.$apply();
            },0);
          }

          scope.displayCurrentProject = function() {
            scope.displayedProject = scope.currentProject;
            safeApply();
          };

          scope.displayNextProject = function() {
            scope.displayedProject = scope.projects[
              _.indexOf(scope.projects, scope.currentProject) + 1] || _.first(scope.projects);
            safeApply();
          };

          scope.displayPreviousProject = function() {
            scope.displayedProject = scope.projects[
              _.indexOf(scope.projects, scope.currentProject) - 1] || _.last(scope.projects);
            safeApply();
          };

          scope.displayAllCampaigns = function() {
            scope.displayedProject = {title: "View All Campaigns"};
            safeApply();
          };
          
          scope.nextProject = function() {
            navigateProject();
            scope.displayNextProject();
          };

          scope.previousProject = function() {
            navigateProject();
            scope.displayPreviousProject();
          };

          navigateProject = function() {
            var slug = scope.displayedProject.slug;
            $location.path("/project/" + slug);

            safeApply();

          };
        }
      };
  }]);
