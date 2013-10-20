var readdir = require(__dirname + '/../lib/readdir');
var _       = require('lodash');

// All files that we managed to find
var files   = [];
// File tree
var tree    = [];
// Exclusion rules for our file finding
var exclude = [];
// Target directories that we care about
var folders = [];

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
    var tree = readdir.getTreeSync(dir, isFileBlacklisted);

    old.tree  = (tree.tree  || []).concat(old.tree);
    old.files = (tree.files || []).concat(old.files);

    return old;
  }, {
    tree  : [],
    files : []
  });
}

/**
 * Arguments listing
 */
exports.args = {
  exclude : [ 'x', 'Exclude items from list (seperated by commas)', 'string', '^\\.']
  //watch   : [ 'w', 'Watch for file/folder changes', 'boolean', true ] // Not implemented at the moment
};

/**
 * @return {Array} tree objects
 */
exports.getFileTree = function() {
  return tree;
};

/**
 * @return {Array} files list
 */
exports.getFiles = function() {
  return files;
};

/**
 * Initiate the module
 *
 * @param {Array} args starting arguments
 * @param {Object} options object
 * @return {Object} exports
 */
exports.init = function(args, options, cb) {
  var listing;

  folders = args;
  exclude = buildBlacklistRules(options.exclude);
  listing = buildFileListing(args);
  tree    = listing.tree;
  files   = listing.files;

  return cb();
};

/**
 * Checks if the file is loaded
 *
 * @param {String} file file to load
 * @return {Boolean} true if the file is loadable. Otherwise false
 */
exports.isLoadable = function(file) {
  return !!~files.indexOf(file);
};
// Module priority. This thing is top priority!
exports.priority = 0;
