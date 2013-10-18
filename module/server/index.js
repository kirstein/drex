var express  = require('express');
var Resource = require('express-resource');
var connect  = require('connect');
var fs       = require('fs');
var app      = express();

// Register the routes.
var routes   = require('./rest')(app);

// Application configuration
app.configure(function() {
  app.use(connect.compress());
  app.use(express.static(process.cwd() + '/public'));

  // Pushstate
  app.get("/file/*", function(req, res) {
    res.set('content-type', 'text/html');
    fs.createReadStream(process.cwd() + '/public/index.html').pipe(res);
  });
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
