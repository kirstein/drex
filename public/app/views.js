(function(angular) {
  'use strict';

  angular.module('views.file', [ 'drex.services' ]).config(function($routeProvider) {
    $routeProvider.when('/file/:path', {
      templateUrl : '/partials/fileTpl.html',
      controller  : 'FileController'
    });
  }).controller('FileController', function($scope, $routeParams, fileResource, fileService) {
    $scope.title   = fileService.parseUrl($routeParams.path);
    $scope.content = fileResource.get({ fileId : $routeParams.path });
  });

  angular.module('drex.views', [ 'views.file' ]);

})(angular);
