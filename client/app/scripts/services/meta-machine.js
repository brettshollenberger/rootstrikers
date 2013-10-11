// @todo @release change metaUrl

angular
  .module('app')
  .factory('MetaMachine', function($rootScope, $location) {

    // ************************************************************************ //
    // *************************** PRIVATE METHODS **************************** //
    // ************************************************************************ //
    var metaDefaults = {
      metaType: "website",
      metaName: "Rootstrikers",
      metaTitle: "Home | Rootstrikers",
      metaDescription: "We fight the corrupting influence of money in politics",
      metaImage: base + "app/images/favicon/RS_Facebook_Icon.jpg",
      metaUrl: base
    };

    var removeHash = function(url) {
        return url.replace('#!/', '');
    };
        
    var base = $location.absUrl().replace($location.path(), '');
    base = removeHash(base);

    var stripHTML = function(text) {
      return text.replace(/(<([^>]+)>)/ig,"");
    };

    // ************************************************************************ //
    // ************************** PUBLIC INTERFACE  *************************** //
    // ************************************************************************ //
    var MetaMachine = {
      title: function(pageTitle, baseTitle) {
        baseTitle = typeof baseTitle != 'undefined' ? baseTitle : "Rootstrikers";
        fullTitle = typeof pageTitle != 'undefined' ? pageTitle + " | " + baseTitle : baseTitle;
        $('title').text(fullTitle);
        $('meta[property="og:title"]').attr('content', fullTitle);
      },
      description: function(description) {
        description = stripHTML(description) || metaDefaults.metaDescription;
        $('meta[property="og:description"]').attr('content', description);
        $('meta[name="description"]').attr('content', description);
      },
      image: function(url) {
        metaImage = url || metaDefaults.metaImage;
        $('link[rel="image_src"]').attr('href', metaImage);
        $('meta[property="og:image"]').attr('content', metaImage);
      },
      url: function(url) {
        metaUrl = url || metaDefaults.metaUrl;
        $('meta[property="og:url"]').attr('content', metaUrl);
      }
    };
    return MetaMachine;
  });
