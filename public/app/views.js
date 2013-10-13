(function(angular) {
  'use strict';

  angular.module('views.file', [ 'drex.services' ]).config(function($routeProvider) {
    $routeProvider.when('/style', {
      templateUrl   : '/partials/styleTpl.html'
    });
  });

  angular.module('drex.views', [ 'views.file' ]);

})(angular);