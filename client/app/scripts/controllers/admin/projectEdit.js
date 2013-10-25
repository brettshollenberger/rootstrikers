angular.module('app').controller('projectEditController', [
    '$scope',
    'flash',
    '$routeParams',
    'projectService',
    '$location',
    'MetaMachine',
    'actionKitService',
    function($scope, notification, $routeParams, projectAPI, $location, MetaMachine, actionKitService) {

    var model;

    $scope.tabs = [{
        name: 'Custom Project',
        active: false
    }, {
        name: 'ActionKit Project',
        active: false
    }];

    //Check for the ID to know if its an edit or a new
    if ($routeParams.projectID) {
        
        //Complements Template title of "Rootstriker Project"
        $scope.actionTitle = 'Edit';
        
        //get the project from the API
        projectAPI.get({projectID: $routeParams.projectID}, function(project) {
            
            if(project.shortname) {
            
                // get the ActionKit page information
                actionKitService.getPage(project.shortname).then(function (response) {
                    if(response !== false) {
                        
                        // parse the actionkit return info to match the project fields
                        project = projectAPI.parseActionkit(project, response);
                        
                        // update the scope model with the returned project
                        updateScopeModel(project);
                    }
                });
                
                // change the active tab to be an actionkit project
                $scope.activeTab = 1;
                $scope.tabs[1].active = true;
            } else {
                // change the active tab to be a custom project
                $scope.activeTab = 0;
                $scope.tabs[0].active = true;
                
                // update the scope model with the returned project
                updateScopeModel(project);
            }
            
            MetaMachine.title("Editing: " + project.title, "Admin");
        });
    } else {
        // Create a new resource and save it to scope
        updateScopeModel(projectAPI.newProject());

        $scope.actionTitle = 'New';
        MetaMachine.title("New Project", "Admin");
    }
    
    var updateScopeModel = function (newModel) {

        // set the model for the admin edit page
        $scope.project = newModel;
        
        // set model for the preview page
        $scope.item = newModel;
    };
    
    $scope.isContentFromOldSite = function(project) {
        return project && project.end_date && project.end_date == "2012-10-20T04:00:00.000Z";
    };

    $scope.signUrl = 'http://act.demandprogress.org/sign/';

    // TinyMCE override options
    $scope.tinymceOptions = {
        plugins: "paste,code",
        paste_remove_styles: true
    };

    var saveModel = function(silent) {
        model.$save(function(project, putResponseHeaders) {
            if (silent) {
                return;
            }
            // If there is no projectID
            if ( !! !$routeParams.projectID) {
                notification.set({
                    body: 'Your Project has been successfully saved',
                    type: 'success'
                });
                $location.path('admin/project/edit/' + project.id).replace();
            }
            notification.pop({
                body: 'Your Project has been successfully saved',
                type: 'success'
            });
        });
    };
    
    $scope.changeTab = function(tab) {
        $scope.tabs[$scope.activeTab].active = false;
        $scope.activeTab = tab;
        $scope.tabs[$scope.activeTab].active = true;
    };

    $scope.selectImage = function() {
        filepicker.setKey('ACoTSGXT4Rj2XWKKTZAaJz');
        filepicker.pick({
            'mimetype': "image/*"
        }, function(InkBlob) {
            //If there was an image already delete it 
            if (model.InkBlob) {
                $scope.removeImage(model.InkBlob);
            }
            //Set the new image to the model
            model.image = InkBlob.url;
            model.InkBlob = InkBlob;
            $scope.$digest();
        });
    };

    $scope.save = function() {
        saveModel();
    };

    $scope.removeImage = function(blob) {
    
        //If we dont have the blob take the actual image
        var InkBlob = blob || model.InkBlob;
        
        if (!InkBlob) {
            return;
        }
        
        //If its an string convert it to json
        if (angular.isString(InkBlob)) {
            InkBlob = JSON.parse(InkBlob);
        }
        
        filepicker.remove(InkBlob, function() {
            //If its the same as the actual model lets remove it
            if (InkBlob.url === model.image) {
                //Set as empty field so its updated on the db
                model.image = '';
                model.InkBlob = '';
                //Save without notification
                saveModel(true);
                notification.pop({
                    body: 'The image has been removed',
                    type: 'success'
                });
            }
        }, function(err) {
            //171 -> image dont exist
            if (err.code === 171) {
                //If the image dont exist remove it from the model
                model.image = '';
                model.InkBlob = '';
                saveModel(true);
            }
            notification.pop({
                body: 'There have been a problem deleting your image',
                type: 'error'
            });
        });
    };

    $scope.remove = function(id) {
        var sure = confirm('U sure?');
        if (sure) {
            model.$remove(function() {
                notification.set({
                    body: 'Your Project has been successfully removed',
                    type: 'success'
                });
                $location.path('admin').replace();
            });
        }
    };

    $scope.publish = function(status) {
        model.publish = status;
        model.$save(function(project, putResponseHeaders) {
            notification.pop({
                body: 'Your Project has been successfully ' + ((status) ? 'published' : 'unpublished'),
                type: 'success'
            });
        });
    };
    
    $scope.deleteActions = function(actions_url) {
        actionKitService.deleteActions(actions_url);
    };
    
}]);
