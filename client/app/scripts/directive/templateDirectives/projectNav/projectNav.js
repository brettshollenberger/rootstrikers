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

              $scope.displayedProject = $scope.currentProject;

              t.findNextProject = function() {
                $scope.displayedProject = $scope.projects[
                  _.indexOf($scope.projects, $scope.displayedProject) + 1] || _.first($scope.projects);
                $scope.$apply();
              };

              t.findPreviousProject = function() {
                $scope.displayedProject = $scope.projects[
                  _.indexOf($scope.projects, $scope.displayedProject) - 1] || _.last($scope.projects);
                $scope.$apply();
              };

              t.viewAllCampaigns = function() {
                $scope.displayedProject = {title: "View All Campaigns"};
                $scope.$apply();
              };

              t.noAction = function() {
                $scope.displayedProject = {title: ""};
                $scope.$apply();
              };
            });
          })(this);
        },
        link: function(scope, element, attrs) {
          scope.navigateProjects = function() {
            var slug = scope.displayedProject.slug;
            $location.path("/project/" + slug);

            if(!scope.$$phase) {
              scope.$apply();
            }
          };
        }
      };
  });
