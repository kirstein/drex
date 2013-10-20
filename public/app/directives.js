(function(angular) {
  var module = angular.module('drex.directives', [ 'drex.services' ]);

  // Left menu directive.
  // Handles the file selection
  module.directive('menuLeft', function() {
    return {
      replace     : false,
      templateUrl : 'partials/menuLeftTpl.html',
      controller  : function($scope, $location, fileResource, fileService) {
        // Get the tree
        $scope.files = fileResource.list();

        /**
         * Replaces all slashes with dashes.
         *
         * @param {Object} node node with the target
         * @return {String} file path for the node target.
         */
        $scope.getUrl = function(node) {
          return fileService.getUrl(node.target);
        };

        /**
         * Checks if the current url represents the nodes target.
         *
         * @param {Object} node object with the target
         * @return {Boolean} true if the url is for node, otherwise false
         */
        $scope.isSelected = function(node) {
          return $location.path() === this.getUrl(node);
        };

        /*
         * @param {Object} node node object with open property
         */
        $scope.toggleOpen = function(node) {
          node.open = !node.open;
        };
      }
    };
  });

})(angular);

