describe ('views spec', function() {

  beforeEach(module('drex.views'));

  describe ('file', function() {
    var scope;
    beforeEach(inject(function($controller, $rootScope, $httpBackend) {
      $httpBackend.expectGET('/rest/file').respond('some-content');
      $controller('FileController', {
        $scope  : scope = $rootScope.$new()
      });
      $httpBackend.flush();
    }));

    it ('should have scope', function() {
      expect(scope).toBeDefined();
    });
  });
});
