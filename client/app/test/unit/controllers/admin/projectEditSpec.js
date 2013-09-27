describe('projectEditController', function() {
  var $scope, projectEditController, projectService;

  beforeEach(module('app', function($provide) {
    projectService = {
      get: function() {
        return {};
      },
      newProject: function() {
        return {};
      }
    };
    spyOn(projectService, 'newProject').andCallThrough();
    spyOn(projectService, 'get').andCallThrough();
    $provide.value('projectService', projectService);
  }));

  describe('New', function() {
    beforeEach(inject(function($injector) {
      var $controller = $injector.get('$controller');

      $scope = $injector.get('$rootScope').$new();

      projectEditController = $controller('projectEditController', {
        $scope: $scope,
        $routeParams: {}
      });
    }));

    it('should set $scope.project to create/edit', function() {
      expect($scope.project).toBeDefined();
      expect($scope.save).toBeDefined();
    });

    it('should set the scope for a new project when dont get a project ID', function() {
      expect($scope.actionTitle).toEqual('New');
      expect(projectService.newProject).toHaveBeenCalled();
      expect(projectService.get).not.toHaveBeenCalled();
    });

    it('should set the scope for a new project when dont get a project ID', function() {
      expect($scope.actionTitle).toEqual('New');
      expect(projectService.newProject).toHaveBeenCalled();
    });
  });

  describe('Edit', function() {
    beforeEach(inject(function($injector) {
      var $controller = $injector.get('$controller');

      $scope = $injector.get('$rootScope').$new();

      projectEditController = $controller('projectEditController', {
        $scope: $scope,
        $routeParams: { projectID : 1}
      });
    }));

    it('should set the scope for edit a project when it get a project ID', function() {
      expect($scope.actionTitle).toEqual('Edit');
      expect(projectService.newProject).not.toHaveBeenCalled();
      expect(projectService.get.mostRecentCall.args[0]).toMatch(/1/);
    });

  });
});