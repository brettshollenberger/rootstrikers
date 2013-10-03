/**
* Script to open a webpage, and capture the html within that page. 
* @note we remove ng-app, which in our case prevents the angular app from starting. 
*
*/
var page = require('webpage').create();
var system = require('system');
var t;
var address;
var callback;

// if user passed no url argument
if (system.args.length === 1) {
  console.log('Usage: loadpage.js <some URL>');
  phantom.exit();
}

var extractHtml = function() { 
	return document.querySelector('html').outerHTML;
};

t = Date.now();
address = system.args[1];

// open a phantom page
page.open(address, function (status) {

    // do some debugging
    // @note we have this disabled because it might interfere with out html
    // since currently we rely on console.log to pass html back to our parent function
    /*
    if (status !== 'success') {
        console.log('FAIL to load the address')
    } else {
        t = Date.now() - t
        console.log('Loading time ' + t + ' msec')
    }
    */

    // @see https://github.com/ariya/phantomjs/wiki/API-Reference-WebPage#wiki-webpage-evaluate
    // this is not async, so we don't need a callback
    var html = page.evaluate(function(s) {
        return document.getElementsByTagName('html')[0].outerHTML;
    });
    
    // remove the angular app part
    html = html.replace(/ng-app=\".*?\"/,'');
    
    // logging it will imitate "return html" and make it accessible in our parent function
    console.log(html);
    
    // stop the phantom process
    phantom.exit();

});
