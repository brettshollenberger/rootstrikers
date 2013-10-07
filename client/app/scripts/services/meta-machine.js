// @todo @release change metaUrl

angular
  .module('app')
  .factory('MetaMachine', function($rootScope) {

    var metaDefaults = {
      metaType: "website",
      metaName: "Rootstrikers",
      metaTitle: "Home | Rootstrikers",
      metaDescription: "We fight the corrupting influence of money in politics",
      metaImage: "/app/images/favicon/apple-touch-icon-144x144-precomposed.png",
      metaUrl: "http://rs002dev.herokuapp.com/"
    };

    (function setDefaults() {
      _.each(metaDefaults, function(val, key) { $rootScope[key] = val; });
    })();

    var MetaMachine = {
      title: function(pageTitle, baseTitle) {
        baseTitle = typeof baseTitle != 'undefined' ? baseTitle : "Rootstrikers";
        $rootScope.metaTitle = typeof pageTitle != 'undefined' ? pageTitle + " | " + baseTitle : baseTitle;
      },
      description: function(description) {
        $rootScope.metaDescription = description || "We fight the corrupting influence of money in politics";
      },
      image: function(url) {
        $rootScope.metaImage = url || "/app/images/favicon/apple-touch-icon-144x144-precomposed.png";
      },
      url: function(url) {
        $rootScope.metaUrl = url || "http://rs002dev.herokuapp.com/";
      }
    };
    return MetaMachine;
  });
