#!/usr/bin/env node
var _   = require('lodash');
var cli = require('cli').enable('glob', 'help');

// Lets load our modules
var modules = [
  'server',
  'search'
].map(function(mod) {
  return require(__dirname + '/../module/' + mod);
});

// Parse all the arguments
cli.parse(
  modules.filter(function(mod) {
    return mod.args;
  }).reduce(function(old, mod) {
    return _.extend(old, mod.args);
  }, {})
);

// Init all the modules with
cli.main(function(args, options) {
  modules.forEach(function(mod) {
    mod.init(args, options);
  });
});



