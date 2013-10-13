var fs   = require('fs');

// Prefix for rest urls
var url = 'rest/';

// Target directory name
var dir  = __dirname + "/" + url;

/**
 * @param {Object} app target application
 * @param {String} file filename
 * @return {Object} registered resource
 */
function registerResource(app, file) {
  return app.resource(url + file.split('.')[0], require(dir + file));
}

/**
 * Registers all files he can find in rest folder to its resource places.
 * Skips file that start with .
 *
 * @param {Object} app target application
 */
module.exports = function(app) {
  return fs.readdirSync(dir).filter(function(file) {
    return file.charAt(0) !== '.';
  }).map(function(file) {
    return registerResource(app, file);
  });
};
