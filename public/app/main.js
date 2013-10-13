(function(angular) {
  'use strict';

  angular.module('drex', [ 'drex.directives', 'drex.views' ]).config(function($locationProvider) {
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');
  });

})(angular);

