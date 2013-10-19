describe ('directives', function() {
  var $rootScope, $compile;

  beforeEach(module('drex.directives', 'partials/menuLeftTpl.html'));
  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $rootScope = _$rootScope_;
    $compile   = _$compile_;
  }));

  function compile(html) {
    var el = $compile(html)($rootScope);
    $rootScope.$apply();
    return el;
  }

  describe ('menuLeft', function() {
    var $httpBackend;
    beforeEach(inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    it ('should compile to html', function() {
      $httpBackend.expectGET('/rest/file').respond([]);
      var el = compile('<section menu-left></section>');
      expect(el.children().length).toBeGreaterThan(0);
      $httpBackend.flush();
    });

    describe ('api', function() {
      var scope;
      beforeEach(function() {
        $httpBackend.expectGET('/rest/file').respond([]);
        scope = compile('<section menu-left></section>').scope();
        $httpBackend.flush();
      });

      describe ('#getUrl', function() {
        it ('should have #getUrl function', function() {
          expect(scope.getUrl).toEqual(jasmine.any(Function));
        });

        it ('should build a url out of nodes target', function() {
          expect(scope.getUrl({ target : 'hello' })).toEqual('/file/hello');
        });

        it ('should build a url out of nodes target and replace the slashes with dashes', function() {
          expect(scope.getUrl({ target : 'hello/kids' })).toEqual('/file/hello-kids');
        });
      });

      describe ('#isSelected', function() {
        it ('should have #isSelected function', function() {
          expect(scope.isSelected).toEqual(jasmine.any(Function));
        });

        it ('should return false if location path differs', inject(function($location) {
          $location.path('/file/test-something');
          $rootScope.$apply();
          expect(scope.isSelected({ target : 'hello' })).toBe(false);
        }));

        it ('should return true if location path is the same', inject(function($location) {
          $location.path('/file/test-something');
          $rootScope.$apply();
          expect(scope.isSelected({ target : 'test/something' })).toBe(true);
        }));
      });

      describe ('#toggleOpen', function() {
        it ('should have #toggleOpen function', function() {
          expect(scope.toggleOpen).toEqual(jasmine.any(Function));
        });

        it ('should set node open true if its false', function() {
          var node = { open: false };
          scope.toggleOpen(node);
          expect(node.open).toBe(true);
        });

        it ('should set node open false if its true', function() {
          var node = { open: true };
          scope.toggleOpen(node);
          expect(node.open).toBe(false);
        });
      });
    });
  });
});
