/**
* Serve up "plain html" versions of angular app pages for search crawlers AND facebook crawlers.
*
* This is needed since Angular apps are rendered entirely by Javascript, and crawlers don't
* execture jsavascipt, so they see blank pages. 
*
* What we do to get around this is: 
* - watch for signs of well behaved crawlers, which is having '?_escaped_fragment_=' in req.params
* - sping up a "phantom" browser on the server 
* - visit the page requested, which is indicated by _escaped_fragment_
* - grab the html from the page
* - remove the ng-app part, preventing the app from starting up again! (thanks see below)
* - send the html back the browser
*
* This will let a crawler access content normally generated by javascript. 
* Especially OG:Meta data!!!
*
* @see https://github.com/stephanebisson/ngseo/blob/master/src/ngseo.js
*      the above middleware would work great if not for the bug in phantom 1.9.2 which
*      causes errors due to unsupported 
*
* @see https://github.com/ariya/phantomjs/wiki/API-Reference-WebPage#wiki-webpage-evaluate
* 
* @note This script should be non-blocking... meaning it will not tie up the main server while the 
*       html page is generated. 
*
*
*/

var express   = require('express');
var app       = module.exports = express();
var renderer  = require('./renderer');
var grunt     = require('grunt');

// use this function as middlware
app.use(function(req, res, next) {
  
  // if we have no escaped fragement, move onto the next process
  if (!req.query || !req.query._escaped_fragment_) {
    return next();
  }

  // we do have a fragment, so lets assemble a URL that we can access within our app
  // basically we are reverse engineering the _escaped_fragment_
  // to figure out which url the crawler hit in the first place.
  var url = (req.secure ? 'https' : 'http') + '://';
  url += 'req.host' + ':' + app.get('port') + req.path;
  url += '#!/' + req.query._escaped_fragment_;

  grunt.tasks(['snapshot'], {url: url}, function(e) {
    grunt.log.ok("done running grunt task " + e);
  });

  // start our page renderer 
  renderer.render(url, function(html) {
    //console.log('Callback has been called');
    console.log(html);
    res.send(html);
  });
});
