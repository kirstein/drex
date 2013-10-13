var fs   = require('fs');
var path = require('path');

/**
 * @param {String} target target folder
 * @param {Function} validate validate function
 */
function getFilesSync(target, validate) {
  return fs.readdirSync(target).reduce(function(old, dir) {
    var loc = path.join(target, dir);
    // Validate the target
    // If its in blacklist then lets carry on
    if (validate && !validate(loc)) {
      return old;
    }

    // Recursive call if its a folder
    return old.concat(fs.statSync(loc).isDirectory() ? getFilesSync(loc, validate) : loc);
  }, []);
}

/**
 * Retuns all the files from given folder that pass the validate method (if one is given).
 * Will do a recursive search over all the folders.
 *
 * @param {String} dir directory to start from
 * @param {Function} validate method that should validate each file
 * @return {Array} array of files
 */
exports.getFilesSync = function(dir, validate) {
  if (!dir) {
    throw new Error('No directory defined');
  }

  return getFilesSync(dir, validate);
};
