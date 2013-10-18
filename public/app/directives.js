(function(angular) {
  var module = angular.module('drex.directives', [ 'drex.services' ]);

  // Left menu directive.
  // Handles the file selection
  module.directive('menuLeft', function() {
    return {
      replace     : false,
      templateUrl : 'partials/menuLeftTpl.html',
      controller  : function($scope, $location, fileResource) {
        $scope.files = fileResource.list();

        $scope.getUrl = function(node) {
          return '/file/' + node.target.replace(/\//g, '-');
        };

        $scope.isSelected = function(node) {
          return $location.path() === this.getUrl(node);
        };

        $scope.toggleOpen = function(node) {
          node.open = !node.open;
        };
      }
    };
  });

})(angular);

