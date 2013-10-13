var optimist = require('optimist');

// Setup the optimist configurations
optimist.usage('Represent your awesome files with drex')
        .options('h', {
  describe : 'you are looking at it!',
  alias    : 'help'
});

exports.init  = function() {
  var args = optimist.argv;

  if (args.help || args.h) {
    optimist.showHelp();
    process.exit(0);
  }

  return exports;
};
