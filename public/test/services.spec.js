describe ('services', function() {
  beforeEach(module('drex.services'));

  describe ('fileResource', function() {

    describe ('#list', function() {
      it ('should have list method', inject(function(fileResource) {
        expect(fileResource.list).toEqual(jasmine.any(Function));
      }));

      it ('should fetch an array', inject(function($httpBackend, fileResource) {
        var spy = jasmine.createSpy();
        $httpBackend.expectGET('/rest/file').respond([ {} ]);
        fileResource.list(spy);
        $httpBackend.flush();
        expect(spy).toHaveBeenCalled();
      }));
    });
  });
});
