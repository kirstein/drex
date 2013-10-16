var should = require('should');
var sinon  = require('sinon');
var search = require(process.cwd() + '/module/search');
var readdir = require(process.cwd() + '/lib/readdir');
var fs = require('fs');

describe ('search mod', function() {
  // Delete the module from cache after this.
  // Needed because the module holds some state!
  beforeEach(function() {
    delete require.cache[require.resolve(process.cwd() + '/module/search')];
  });

  describe ('#args', function() {
    it ('should have args defined', function() {
      search.args.should.be.instanceOf(Object);
    });

    it ('should contain exlude argument', function() {
      search.args.exclude.should.be.ok;
    });
  });

  describe ('#getFilesTree', function() {
    it ('should contain #getFilesTree function', function() {
      search.getFilesTree.should.be.instanceOf(Function);
    });
  });

  describe ('#init', function() {
    it ('should contain init method', function() {
      search.init.should.be.instanceOf(Function);
    });

    it ('should ask for folder listing for defined folder', sinon.test(function() {
      this.stub(readdir, 'getTreeSync').returns([ ]);
      search.init([ 'folder'], {});
      readdir.getTreeSync.args[0][0].should.eql('folder');
    }));

    it ('should return the files returned by readdir', sinon.test(function() {
      var expected = [ { name: 'test', target : 'dir/test' }];
      this.stub(readdir, 'getTreeSync').returns(expected);
      search.init([ 'dir' ], {});
      search.getFilesTree().should.eql(expected);
    }));

    it ('should exclude the files if they match the exclusion criteria regexp', sinon.test(function() {
      this.stub(fs, 'readdirSync').withArgs('dir').returns([ 'what', 'is' ]);
      this.stub(fs, 'statSync').returns({ isDirectory : function() { return false; }});

      search.init([ 'dir' ], {
        exclude : '.*'
      });

      search.getFilesTree().should.eql([]);
    }));

    it ('should exclude the files if they match the exclusion criteria', sinon.test(function() {
      this.stub(fs, 'readdirSync').withArgs('dir').returns([ 'what', 'is' ]);
      this.stub(fs, 'statSync').returns({ isDirectory : function() { return false; }});
      search.init([ 'dir' ], {
        exclude : 'is'
      });

      search.getFilesTree().should.eql([ { name : 'what', target : 'what' } ]);
    }));

    it ('should look at the starting directory if no args is defined', sinon.test(function() {
      this.stub(fs, 'readdirSync').returns([]);
      search.init([], {});
      fs.readdirSync.args[0][0].should.eql(process.cwd());
    }));
  });
});

