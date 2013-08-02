describe('projectEditController', function() {
  var $scope;
  var projectEditController;

  beforeEach(module('app', function($provide) {
    $provide.value('apiService', {
      project: {
        then: function() {}
      }
    });
  }));

  beforeEach(inject(function($injector) {
    var $controller = $injector.get('$controller');

    $scope = $injector.get('$rootScope').$new();

    projectEditController = $controller('projectEditController', {
      $scope: $scope
    });
  }));

  it('should set $scope.project to create/edit', function() {
    expect($scope.project).toBeDefined();
  });

  it('should set the title action to new when dont get a project ID', function() {
    expect($scope.actionTitle).toEqual('New');
  });
});