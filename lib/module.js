var fs   = require('fs');
var path = require('path');
var _    = require('lodash');

/**
 * Load modules. And sort them according to their initiation priorities.
 * It will require the modules.
 *
 * The ordering will happen according to module priority setting.
 * If the priority is not set then it will mark those modules as last ones.
 *
 * @param {String} dir location where modules exist
 * @return {Array} array of modules
 */
exports.loadModulesSync = function(dir) {
  return fs.readdirSync(dir).map(function(mod) {
    return require(path.join(dir, mod));
  }).sort(function(a, b) {
    return _.isUndefined(a.priority) ? 9999 : a.priority - b.priority;
  });
};

/**
 * Gets all the arguments from given modules, builds an object out of the arguments.
 *
 * @param {Array} modules array of modules
 * @return {Object} object of arguments and their configurations
 */
exports.getArguments = function(modules) {
  return modules.reduce(function(old, val) {
    return _.extend(old, val.args);
  }, {});
};

/**
 * Initiate the modules by calling their init method (if it exists).
 * Will initiate modules one at the time according to their priority.
 *
 * Each initiated module MUST trigger defined callback in order the chain to continue.
 * If the module has no init method then it will just ignore it.
 *
 * @param {Array} modules list of modules (pre ordered)
 * @param {Array} args given arguments (file listing)
 * @param {Object} options cli options
 */
exports.initModules = function(modules, args, options) {
  var count = 0;

  (function loadNext(res) {
    if (count > modules.length) { return; }
    var mod = modules[count++];

    return mod && _.isFunction(mod.init) ? mod.init(args, options, loadNext) : loadNext();
  })();
};
