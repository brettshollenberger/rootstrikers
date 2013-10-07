/**
* Function to over see our phantom actions. 
* Here we load the file specified as 'loadpage.js' and pass it arguments
*
*/

var childProcess = require('child_process');
var fs = require('fs');
var path = require('path');
var join = path.join;
var env = process.env.NODE_ENV || 'development';

var binPath = null;

fs.existsSync = fs.existsSync || path.existsSync;

if (env !== 'development') {
    console.log('We are not in development');
    binPath = join(__dirname, '/../../../', 'vendor/phantomjs/bin/phantomjs');
} else {
    binPath = require('phantomjs').path;
}

module.exports.render = function(url, callback) {

    // build arguments, the first is the script we will run
    // second is url we access
    var childArgs = [
      path.join(__dirname, 'loadpage.js'),
      url
    ];
    
    // start a child processs
    // @note this is non-blocking
    childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
        
      console.info('Phantom stuff is done!');
      
      // @todo make more robust. stdout is just what we console.log() within loadpage.js
      // Since the .execute() function is loadpage.js is sandboxed, we can't directly return
      // or do a callback to send back the html data we need. THERE must be some way to bind to
      // events boradcast and capture the variables that way. 
      callback(stdout);
    
    });

};
