(function(angular) {
  'use strict';

  var module = angular.module('drex.services', [ 'ngResource' ]);

  module.factory('fileResource', function($resource) {
    return $resource('/rest/file/:fileId', { fileId: '@id' });
  });

  module.factory('configResource', function($resource) {
    return $resource('/rest/config');
  });

})(angular);


