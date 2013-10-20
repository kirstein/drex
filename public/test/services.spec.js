describe ('services', function() {
  beforeEach(module('drex.services'));

  describe ('fileService', function() {
    describe ('#parseUrl', function() {
      it ('should have parseUrl method', inject(function(fileService) {
        expect(fileService.parseUrl).toEqual(jasmine.any(Function));
      }));

      it ('should transform dashes into slashes', inject(function(fileService) {
        expect(fileService.parseUrl('-file-asd-asd')).toEqual('/file/asd/asd');
      }));

      it ('should replace empty string when the input is not defined', inject(function(fileService) {
        expect(fileService.parseUrl()).toEqual('');
      }));
    });

    describe ('#getUrl', function() {
      it ('should have getUrl method', inject(function(fileService) {
        expect(fileService.getUrl).toEqual(jasmine.any(Function));
      }));

      it ('should append /file to given target', inject(function(fileService) {
        expect(fileService.getUrl('test')).toEqual('/file/test');
      }));

      it ('should transform dashes into slashes', inject(function(fileService) {
        expect(fileService.getUrl('test/hello')).toEqual('/file/test-hello');
      }));
    });
  });

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
