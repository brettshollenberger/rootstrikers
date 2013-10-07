// @todo @release change metaUrl

angular
  .module('app')
  .factory('MetaMachine', function($rootScope, $location) {
     
        
    var base = $location.absUrl().replace($location.path(), '');
    base = base.replace('#!', '');
    console.log(base);
    
    var removeHash = function(url) {
        return url.replace('#!/', '');
    };
            

    var metaDefaults = {
      metaType: "website",
      metaName: "Rootstrikers",
      metaTitle: "Home | Rootstrikers",
      metaDescription: "We fight the corrupting influence of money in politics",
      metaImage: base + "app/images/favicon/apple-touch-icon-144x144-precomposed.png",
      metaUrl: base
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
        console.log(description);
        $rootScope.metaDescription = description || metaDefaults.metaDescription;
      },
      image: function(url) {
        $rootScope.metaImage = url || metaDefaults.metaImage;
      },
      url: function(url) {
        $rootScope.metaUrl = removeHash(url) || metaDefaults.metaUrl;
      }
    };
    return MetaMachine;
  });
