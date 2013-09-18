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
    "url" : "about-us",
    "header" : "About Us",
    "body" : "<p>This is where the About Us page would have content.</p>",
    "publish" : true,
    "__v" : 0
},
{
    "name" : "Privacy",
    "url" : "privacy-policy",
    "header" : "Privacy Policy",
    "body" : 
        "<p>We take your privacy very seriously. We do not share your email address or other personal"+
        " information with unauthorized entities without your permission.</p><p>For petitions, open"+
        " letters, or similar public communications that you’ve signed or completed, we treat your name,"+
        " city, state, and comments as public information. We will not make your street address publicly"+
        " available, but we may transmit it to public officials as part of a petition or open letter.</p>"+
        "<p>If you have any questions about our privacy policy, don’t hesitate to <a href='#'>contact us</a>.</p>",
    "publish" : true,
    "__v" : 0
}];