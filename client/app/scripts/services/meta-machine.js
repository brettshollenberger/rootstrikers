angular
  .module('app')
  .factory('MetaMachine', function($rootScope) {
    var MetaMachine = {
      title: function(pageTitle, baseTitle) {
        baseTitle = typeof baseTitle != 'undefined' ? baseTitle : "Rootstrikers";
        $rootScope.title = typeof pageTitle != 'undefined' ? pageTitle + " | " + baseTitle : baseTitle;
      },
      description: function(description) {
        $rootScope.metaDescription = description || "We fight the corrupting influence of money in politics";
      }
    };
    return MetaMachine;
  });
