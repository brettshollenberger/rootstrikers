describe('projectService as Project API', function() {
  var $httpBackend;
  var projectService;

  // Initialize `app` module
  beforeEach(module('app'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    projectService = $injector.get('projectService');
  }));

  // Ensure expected requests were made
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  // Test exposed properties
  it('should return a project API', function() {
    //Create
    expect(projectService.newProject).toBeDefined();
    //Get collection by filter
    expect(projectService.getAll).toBeDefined();
    //Get by ID
    expect(projectService.get).toBeDefined();
    //Remove By ID
    expect(projectService.get).toBeDefined();
    //POST and PUT will be handle by resource service
  });

  it('should return a model to save new data', function() {
    var project = projectService.newProject();
    project.id = 1;

    //Only test url because test of data is resource resopnsability
    $httpBackend.expectPOST('/api/project/1').respond(200, '');
    project.$save();
    $httpBackend.flush();
  });

  it('should query for all project with and without filter', function() {

    $httpBackend.expectGET('/api/project').respond(200, '');
    projectService.getAll();

    $httpBackend.expectGET('/api/project?param=value').respond(200, '');
    projectService.getAll({
      param: 'value'
    });

    $httpBackend.flush();
  });

  it('should get a project by ID', function() {
    //If there is no callback do not call
    projectService.get();
    $httpBackend.verifyNoOutstandingRequest();

    $httpBackend.expectGET('/api/project/1').respond(200, '');
    projectService.get(1, angular.noop);

    $httpBackend.flush();
  });

  it('should call a del to project by ID', function() {
    $httpBackend.expectDELETE('/api/project/1').respond(200, '');
    projectService.remove(1, angular.noop);

    $httpBackend.flush();
  });
});