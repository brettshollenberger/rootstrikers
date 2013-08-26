// This is executed as soon as the Facebook SDK is loaded
window.fbAsyncInit = function()
{
  FB.init(
    {
      appId: 209806639177914, // App ID
      status: true, // check login status
      cookie: true, // enable cookies to allow the server to access the session
      xfbml: true  // parse XFBML
    }
  );

};
// END window.fbAsyncInit


// Load the SDK Asynchronously
(function(d)
{
  var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement('script');
  js.id = id; js.async = true;
  js.src = "//connect.facebook.net/en_US/all.js";
  ref.parentNode.insertBefore(js, ref);
}(document));