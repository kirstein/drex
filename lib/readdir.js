var fs   = require('fs');
var path = require('path');
var _    = require('lodash');

/**
 * @param {String} target target folder
 * @param {Function} validate validate function
 */
function getFilesSync(target, validate) {
  return fs.readdirSync(target).reduce(function(old, file) {
    var loc = path.join(target, file);
    // Validate the target
    // If its in blacklist then lets carry on
    if (validate && !validate(file)) {
      return old;
    }

    // Recursive call if its a folder
    return old.concat(fs.statSync(loc).isDirectory() ? getFilesSync(loc, validate) : loc);
  }, []);
}

/**
 * Returns the necessary tree object
 * Each tree has its name and target.
 * Children shall be added later on.
 *
 * @param {String} loc long location
 * @param {String} target short location (directory, file)
 * @return {Object} leaf
 */
function buildObj(loc, target) {
  return {
    name     : target,
    target   : loc
  };
}

/**
 * @param {String} target target folder
 * @param {Function} validate validate function
 */
function getTreeSync(target, validate) {
  return fs.readdirSync(target).filter(function(file) {
    // If the validate function is given then lets remove that file/folder
    return validate ? validate(file) : true;
  }).reduce(function(old, file) {
    var loc = path.join(target, file),
        obj = buildObj(loc, file);

    // If its a directory then lets pass gather all the sub-notes
    if (fs.statSync(loc).isDirectory()) {
      obj.children = (obj.children || []).concat(getTreeSync(loc, validate));
    }

    return old.concat(obj);
  }, []);
}

/**
 * Returns all the files from given folder that pass the validate method (if one is given).
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

/**
 * Returns all the files from given folder that pass the validate method.
 * Will represent files in tree view.
 *
 * @param {String} dir directory to start from
 * @param {Function} validate method that should validate each file
 * @return {Array} array of leafs
 */
exports.getTreeSync = function(dir, validate) {
  if (!dir) {
    throw new Error('No directory defined');
  }

  return getTreeSync(dir, validate);
};
