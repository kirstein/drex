describe ('views spec', function() {

  beforeEach(module('drex.views'));

  describe ('file', function() {
    var scope;
    beforeEach(inject(function($controller, $rootScope) {
      $controller('FileController', {
        $scope  : scope = $rootScope.$new(),
        content : 'some-content'
      });
    }));

    it ('should have scope', function() {
      expect(scope).toBeDefined();
    });

    it ('should set content to scope param', function() {
      expect(scope.content).toEqual('some-content');
    });
  });

});
