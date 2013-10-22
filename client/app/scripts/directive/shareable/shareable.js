angular
  .module('app')
  .directive('shareable', ['$location', function($location) {
    return {
      restrict: 'A',
      priority: 0,
      replace: false,
      controller: function($scope) {
        $scope.shareableNetworks = [];

        // @note this was replaced with encodeURIComponent
        //       which does this same thing but is more robust and accounts for more than just
        //       the hashbang
        // 
        //this.absUrl = $location.absUrl().replace(/\/#!\//, "%2F%23%21%2F");
        this.absUrl = encodeURIComponent($location.absUrl());

        this.addFacebook = function() {
          $scope.shareableNetworks.push("Facebook");
        };

        this.addTwitter = function() {
          $scope.shareableNetworks.push("Twitter");
        };

        this.inShareableNetworks = function(network) {
          return _.contains($scope.shareableNetworks, network);
        };

        $scope.absUrl = this.absUrl;
        $scope.inShareableNetworks = this.inShareableNetworks;
      },
      link: function(scope, elements, attrs) {
        
      }
    };
  }]);

