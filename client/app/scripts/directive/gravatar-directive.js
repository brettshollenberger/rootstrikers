angular.module('ui-gravatar', ['md5']).
    factory('gravatarImageService', ['md5', function (md5) {
        return {
            getImageSrc : function(value, size, rating, defaultUrl, secure) {
                // convert the value to lower case and then to a md5 hash
                var hash = md5.createHash(value.toLowerCase());
                var src = (secure ? 'https://secure' : 'http://www' ) + '.gravatar.com/avatar/' + hash + '?s=' + size + '&r=' + rating + '&d=' + defaultUrl;
                return src;
            }
        };
    }]).
    directive('gravatarImage', ['gravatarImageService', function (gravatarImageService) {
        return {
            restrict:"EAC",
            replace: false,
            link:function (scope, elm, attrs) {
                // by default the values will come in as undefined so we need to setup a
                // watch to notify us when the value changes
                scope.$watch(attrs.email, function (value) {
                    // let's do nothing if the value comes in empty, null or undefined
                    if ((value !== null) && (value !== undefined) && (value !== '')) {
                        // parse the size attribute
                        var size = attrs.size || 40;
                        // parse the ratings attribute
                        var rating = attrs.rating || 'pg';
                        // parse the default image url
                        var defaultUrl = 'http://s.gravatar.com/avatar/49c817adb4ecf8db820482f14d27009b?s=120' || '404';
                        // parse css class
                        var cssClass = attrs.cssClass || 'gravatar-icon" ';
                        // get image src from service
                        var src = gravatarImageService.getImageSrc(value, size, rating, defaultUrl, attrs.secure);
                        // construct the tag to insert into the element
                        var tag = '<img class="' + cssClass + '" src="' + src + '" >';
                        //remove any existing imgs 
                        elm.find('img').remove();
                        // insert the tag into the element
                        elm.append(tag);
                    }
                });
            }};
    }]);
