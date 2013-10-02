angular
  .module('app')
  .directive('shareable', function($location) {
    return {
      restrict: 'A',
      priority: 0,
      replace: false,
      controller: function($scope) {
        $scope.shareableNetworks = [];
        
        this.absUrl = $location.absUrl().replace(/#!/, '');

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
  });

