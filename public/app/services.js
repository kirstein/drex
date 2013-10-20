(function(angular) {
  'use strict';

  var module = angular.module('drex.services', [ 'ngResource' ]);

  module.factory('fileResource', function($resource) {
    return $resource('/rest/file/:fileId', { fileId: '@id' }, {
      list : {
        isArray: true,
        method : 'GET'
      }
    });
  });

  module.factory('configResource', function($resource) {
    return $resource('/rest/config');
  });

  module.service('fileService', function() {

    /**
     * @param {String} title title to transform
     * @return {String} transformed title
     */
    this.parseUrl = function(title) {
      return (title || '').replace(/\-/g, '/')
                          .replace(/\$dot\$/g, '.');
    };

    /**
     * @param {String} url url to transform
     * @return {String} transformed url
     */
    this.getUrl = function(target) {
      return '/file/' + target.replace(/\//g, '-')
                              .replace(/\./g, '$dot$');
    };
  });

})(angular);


