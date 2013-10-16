var readdir = require(__dirname + '/../lib/readdir');

// All files that we managed to find
var files   = [];
// Exclusion rules for our file finding
var exclude = [];

/**
 * Checks if the file is blacklisted or not.
 * If the first validation rule tests for positive then lets assume its blacklisted
 *
 * @param {String} file file name to validate
 * @return {Boolean} false if its not allowed, otherwise true
 */
function isFileBlacklisted(file) {
  return !exclude.some(function(rule) {
    return rule.test(file);
  });
}

/**
 * Arguments listing
 */
exports.args = {
  exclude : [ 'x', 'Exclude items from list (seperated by commas)', 'string', '^\\.']
  //watch   : [ 'w', 'Watch for file/folder changes', 'boolean', true ] // Not implemented at the moment
};

exports.getFilesTree = function() {
  return files;
};

/**
 * Builds the blacklist rules.
 *
 * @param {String} rules string of rules separated by comma
 * @return {Array} array of regexpes
 */
function buildBlacklistRules(rules) {
  return (rules || '').split(',').map(function(rule) {
    return new RegExp(rule);
  });
}

/**
 * Builds the file listing while checking each individual file against blacklist.
 *
 * @param {Array} files list of folders
 * @return {Array} list of files
 */
function buildFileListing(files) {
  if (!files.length) {
    files.push(process.cwd());
  }

  // We will treat each argument as file or folder to search
  return files.reduce(function(old, dir) {
    // Remove the excess folders. Keep the folders somewhat relative to their dir path
    return readdir.getTreeSync(dir, isFileBlacklisted).map(function(file) {
      console.log('file', file);
      file.target = file.target.substr(dir.length + 1);
      return file;
    }).concat(old);
  }, []);
}

/**
 * Initiate the module
 *
 * @param {Array} args starting arguments
 * @param {Object} options object
 * @return {Object} exports
 */
exports.init = function(args, options) {
  exclude = buildBlacklistRules(options.exclude);
  files   = buildFileListing(args);

  return exports;
};
