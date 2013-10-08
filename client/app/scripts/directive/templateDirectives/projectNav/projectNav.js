angular
  .module('app')
  .directive('projectNav',
    function($location) {
      return {
        restrict: 'EA',
        templateUrl: 'app/templates/components/projectNav/projectNav.html',
        replace: false,
        controller: function($scope, projectService, $routeParams) {
          (function projectNavConstructor(t) {
            projectService.query(function(result) {
              $scope.projects = result;
              this.projects = $scope.projects;

              $scope.currentProject = _.find($scope.projects, function(project) {
                return project.slug == $routeParams.name;
              });
            });
          })(this);
        },
        link: function(scope, element, attrs) {

          scope.displayNextProject = function() {
            scope.displayedProject = scope.projects[
              _.indexOf(scope.projects, scope.currentProject) + 1] || _.first(scope.projects);
            scope.$apply();
          };

          scope.displayPreviousProject = function() {
            scope.displayedProject = scope.projects[
              _.indexOf(scope.projects, scope.currentProject) - 1] || _.last(scope.projects);
            scope.$apply();
          };

          scope.displayNone = function() {
            scope.displayedProject = {title: ""};
            scope.$apply();
          };

          scope.displayAllCampaigns = function() {
            scope.displayedProject = {title: "View All Campaigns"};
            scope.$apply();
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

            if(!scope.$$phase) {
              scope.$apply();
            }
          };
        }
      };
  });
