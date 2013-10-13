var express  = require('express');
var Resource = require('express-resource');
var app      = express();

// Register the routes.
var routes   = require('./rest')(app);

// Application configuration
app.configure(function() {
  app.use(express.static(process.cwd() + '/public'));
}).configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}).configure('production', function(){
  app.use(express.errorHandler());
});

/**
 * Default arguments
 */
exports.args = {
  port : [ 'p', 'Port to listen', 'number', 3004 ]
};

/**
 * Initiate the module
 *
 * @param {Array} args starting arguments
 * @param {Object} options object
 * @return {Object} exports
 */
exports.init = function(args, options) {
  app.listen(options.port, function() {
    console.log("Server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

  return exports;
};
