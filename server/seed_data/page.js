exports.seed = function() {
    return data;
};

var data = [{
    "name" : "Awesome",
    "url" : "http://google.com",
    "header" : "The best",
    "body" : "<p>Great</p>",
    "publish" : false,
    "__v" : 0
},
{
    "name" : "About",
    "url" : "pages/about",
    "header" : "About",
    "body" : "<p>Great</p>",
    "publish" : true,
    "__v" : 0
},
{
    "name" : "Privacy",
    "url" : "pages/privacy",
    "header" : "Privacy Page!",
    "body" : "<p>Great</p>",
    "publish" : true,
    "__v" : 0
}];