(function(angular) {
  var module = angular.module('drex.directives', [ 'drex.services' ]);

  // Left menu directive.
  // Handles the file selection
  module.directive('menuLeft', function() {
    return {
      replace     : false,
      templateUrl : 'partials/menuLeftTpl.html',
      controller  : function($scope, fileResource) {
        $scope.files = fileResource.get();
      }
    };
  });

})(angular);

