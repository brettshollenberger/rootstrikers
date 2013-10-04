angular
  .module('app')
  .factory('MetaMachine', function($rootScope) {

    var metaDefaults = {
      metaTitle: "Home | Rootstrikers",
      metaDescription: "We fight the corrupting influence of money in politics",
      metaImage: "http://facultycreative.com/img/icons/facultyicon114.png",
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
        $rootScope.metaImage = url || "http://facultycreative.com/img/icons/facultyicon114.png";
      },
      url: function(url) {
        $rootScope.metaUrl = url || "http://rs002dev.herokuapp.com/";
      }
    };
    return MetaMachine;
  });
