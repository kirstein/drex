module.exports = function(config) {
  config.set({
    frameworks : [ 'jasmine' ],
    basePath   : 'public/',
    browsers   : ['PhantomJS'],
    colors     : true,
    reporters  : [ 'spec', 'growl' ],
    files      : [
      'components/angular/angular.js',
      'components/angular-mocks/angular-mocks.js',
      'app/**/*.js',
      'test/**/*.js'
    ],
    singleRun  : true
  });
};