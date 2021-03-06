// Generated on 2013-10-07 using generator-nodejs 0.0.7
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    complexity: {
      generic: {
        src: ['app/**/*.js'],
        options: {
          errorsOnly: false,
          cyclometric: 6,       // default is 3
          halstead: 16,         // default is 8
          maintainability: 100  // default is 100
        }
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        '**/*.js',
        'test/**/*.js',
        '!tmp/**/*.js',
        '!node_modules/**/*.js',
        '!public/components/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    karma : {
      options : {
        configFile : 'karma.conf.js',
      },
      spec : {
        autoWatch  : false,
        singleRun  : true
      },
      ci : {
        background: true
      }
    },
    mochacli: {
      spec: ['test/**/*.spec.js'],
      options: {
        growl    : true,
        reporter : 'spec',
        ui       : 'tdd'
      }
    },
    watch: {
      js: {
        files: ['**/*.js', '!node_modules/**/*.js', '!tmp/**/*.js'],
        tasks: ['default'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-complexity');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-cli');

  grunt.registerTask('ci', ['complexity', 'jshint', 'mochacli', 'karma:spec']);
  grunt.registerTask('test', ['jshint', 'mochacli', 'watch']);
  grunt.registerTask('default', ['test']);
};
