#!/usr/bin/env node
var cli = require('cli').enable('glob', 'help');
var mod = require(__dirname + '/../lib/module');

// Module directory
var MOD_DIR = __dirname + '/../module/';

// List of modules.
var modules = mod.loadModulesSync(MOD_DIR);

// Parse all the arguments
cli.parse(mod.getArguments(modules));
cli.main(function(args, options) {
  mod.initModules(modules, args, options);
});



