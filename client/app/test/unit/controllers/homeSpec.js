describe('homeController', function() {
  var $scope, homeController, projectService;

  // Initialize `app` module + mock `projectService`
  beforeEach(module('app', function($provide) {
    projectService = {
      getAll: function() {
        return [];
      }
    };
    spyOn(projectService, 'getAll').andCallThrough();
    $provide.value('projectService', projectService);
  }));

  // Store `$scope` and `homeController` locally
  beforeEach(inject(function($injector) {
    var $controller = $injector.get('$controller');

    $scope = $injector.get('$rootScope').$new();

    homeController = $controller('homeController', {
      $scope: $scope
    });
  }));

  // Test `$scope` properties
  it('should set published projects in the $scope', function() {
    expect($scope.projects).toBeDefined();
    expect(projectService.getAll).toHaveBeenCalled();
  });
});