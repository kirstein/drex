var search = require('./search');
var prompt = require('prompt');

var properties = [{
    default   : 'n',
    name      : 'continue',
    validator : /y|Y|n|N/,
    warning   : 'y or n please'
}];

/**
 * Exit the system. If the error code exist then exit with 1, otherwise with 0
 *
 * @param {Object} err error
 */
function die(err) {
  if (err) { console.log(err); }
  process.exit (!!err + 0);
}

/**
 * Warn the user about the issues that might occur if the user passes when there are way too many files
 *
 * @param {Array} files files array
 * @param {Function} cb callback to call if the user passes
 */
function promptUser(files, cb) {
  prompt.start();
  console.log('It seems that we are dealing with LARGE amount of files (%d). This might cause problems...', files.length);
  prompt.get(properties, function(err, result) {
    if (err) { return die(err); }
    if (result.continue.toLowerCase() === 'n') { die(); }
    cb();
  });
}

/**
 * Module arguments
 */
exports.args = {
  maxFiles : [ false, 'Number of maximum files to look at. Will display warning if the limit is exceeded', 'number', 5 ]
};

/**
 * Initiate the module
 *
 * @param {Array} args starting arguments
 * @param {Object} options object
 * @param {Function} cb callback that has to be called if the method is initiated
 * @return {Object} exports
 */
exports.init = function(args, options, cb) {
  var files = search.getFiles();
  if (files.length >= options.maxFiles) {
    promptUser(files, cb);
  } else {
    cb();
  }
};

// Module priority. Place it on top of the chain
exports.priority = 1;

