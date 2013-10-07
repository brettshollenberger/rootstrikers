angular
.module('app')
.controller('activityController', [
    '$rootScope', 
    '$scope', 
    'actionService',
    '$timeout',
    function($rootScope, $scope, actionService, $timeout) {
        
        // options
        var timeDelay = 5000;
        var timePause = 500;
        
        // available scope items
        $scope.activity = [];
        $scope.visibleActivity = [];
        $scope.animateIn = false;
        
        // private variables
        var currIndex = 0;
        
        // get all activity for the site
        $scope.findAll = function() {
            actionService.getAllActionUsers().then(function(response) {
                $scope.activity = response;  
                startActivityLoop();    
            });
        };
        
        // private function to advance activity display
        var startActivityLoop = function() {
            
            // set the visible activity to current index
            $scope.visibleActivity = $scope.activity[currIndex];
            
            $scope.animateIn = true;
            
            // incriment our count and then load a new image
            $timeout(function() {
            
                // increase our index by 1 or reset to 0
                currIndex = currIndex < $scope.activity.length-1 ? currIndex + 1 : 0;
                // re-run this function
                pauseActivityLoop();
                
            }, timeDelay);
            
        };
        
        // private function to advance activity display
        var pauseActivityLoop = function() {
            
            //$scope.visibleActivity = null;
            $scope.animateIn = false;
            
            // incriment our count and then load a new image
            $timeout(function() {
            
                // re-run this function
                startActivityLoop();
                
            }, timePause);
            
        };
    
}]);