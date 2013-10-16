describe ('services', function() {
  beforeEach(module('drex.services'));

  describe ('fileResource', function() {

    it ('should fetch get', inject(function($httpBackend, fileResource) {
      $httpBackend.expectGET('/rest/file').respond({ files : [] });
      fileResource.get();
      $httpBackend.flush();
    }));

  });
});
