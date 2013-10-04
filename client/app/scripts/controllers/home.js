angular.module('app').controller('homeController', ['$rootScope', '$scope', 'userService', 'projectService', 'featureService', 'MetaMachine', 'actionKitService', 'actionService', function($rootScope, $scope, userService, Project, Feature, MetaMachine, actionKitService, actionService) {

    MetaMachine.title("Home");
    MetaMachine.description("We fight the corrupting influence of money in politics");

    $scope.projects = Project.getActive();
    $scope.completed_projects = Project.getCompleted();
    $scope.features = Feature.getPublished();

    // This users object serves no useful purpose in the final app, 
    // but we need something to stand-in for gravatars until we write
    // an association for project.supporters
    $scope.users = userService.getAll();

    var handleResponse = function(project) {
    
        actionKitService.getPage(project.shortname).then(function(response) {
    
            if (response !== false) {
                project.title = response.title;
                project.sub_title = response.petitionForm.statement_leadin;
                project.problem = response.petitionForm.about_text;
                project.action = response.petitionForm.statement_text;
                project.goal = response.goal;
            }
        
        });
    };

    $scope.$watch('projects', function(newValues, oldValues) {
                
        if(!newValues || !newValues.length) return;
        
        _.each(newValues, function(project) {
                        
            project.actionUsers = [];
            
            if (project.shortname) {
                handleResponse(project);
            }
            
            // get the last activity for each project
            actionService.getProjectActionUsers(project.id).then(function(response) {
                project.actionUsers = response;
                var actionUserCount = project.actionUsers.length;
                project.actionUserMore = actionUserCount > 3 ? actionUserCount - 3 : 0; 
            });
                
        });
        
    });
    
}]);