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
      'components/angular-resource/angular-resource.js',
      'app/**/*.js',
      'test/**/*.js',
      'partials/**/*.html'
    ],
    singleRun  : true,
    // generate js files from html templates to expose them during testing.
    preprocessors : {
      'partials/**/*.html': 'ng-html2js'
    }
  });
};
