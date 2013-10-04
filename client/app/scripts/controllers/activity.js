angular
.module('app')
.controller('activityController', [
    '$rootScope', 
    '$scope', 
    'actionService',
    '$timeout',
    function($rootScope, $scope, actionService, $timeout) {
        
        // options
        var timeDelay = 2200;
        
        // available scope items
        $scope.activity = [];
        $scope.visibleActivity = [];
        
        // private variables
        var currIndex = 0;
        
        // get all activity for the site
        $scope.findAll = function() {
            actionService.getAllActionUsers().then(function(response) {
                console.log(response);
                $scope.activity = response;  
                startActivityLoop();    
            });
        };
        
        // private function to advance activity display
        var startActivityLoop = function() {
            
            // set the visible activity to current index
            $scope.visibleActivity = $scope.activity[currIndex];
            
            // incriment our count and then load a new image
            $timeout(function() {
            
                // increase our index by 1 or reset to 0
                currIndex = currIndex < $scope.activity.length-1 ? currIndex + 1 : 0;
                // re-run this function
                startActivityLoop();
                
            }, timeDelay);
            
        };
    
}]);