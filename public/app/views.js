(function(angular) {
  'use strict';

  angular.module('views.file', [ 'drex.services' ]).config(function($routeProvider) {
    $routeProvider.when('/file/:path', {
      templateUrl : '/partials/fileTpl.html',
      controller  : 'FileController',
      resolve     : function(fileResource, $routeParams) {
        content : {
          return fileResource.get({ fileId : $routeParams.path });
        }
      }
    });
  }).controller('FileController', function($scope, $routeParams, content, fileResource) {
    $scope.content = content;
    $scope.title = $routeParams.path;
  });

  angular.module('drex.views', [ 'views.file' ]);

})(angular);
