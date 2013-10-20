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

  it ('should have priority of 0', function() {
    search.priority.should.eql(0);
  });

  describe ('#args', function() {
    it ('should have args defined', function() {
      search.args.should.be.instanceOf(Object);
    });

    it ('should contain exlude argument', function() {
      search.args.exclude.should.be.ok;
    });
  });

  describe ('#getFileTree', function() {
    it ('should contain #getFileTree function', function() {
      search.getFileTree.should.be.instanceOf(Function);
    });
  });

  describe ('#getFiles', function() {
    it ('should contain #getFiles function', function() {
      search.getFiles.should.be.instanceOf(Function);
    });
  });

  describe ('#isFileAvailable', function() {
    it ('should contain #isFileAvailable function', function() {
      search.isFileAvailable.should.be.instanceOf(Function);
    });
  });

  describe ('#init', function() {
    it ('should contain init method', function() {
      search.init.should.be.instanceOf(Function);
    });

    it ('should ask for folder listing for defined folder', sinon.test(function() {
      this.stub(readdir, 'getTreeSync').returns([ ]);
      search.init([ 'folder'], {}, sinon.spy());
      readdir.getTreeSync.args[0][0].should.eql('folder');
    }));

    it ('should return the files returned by readdir', sinon.test(function() {
      var expected = { tree : [ { name: 'test', target : 'dir/test' }], files : [ 'dir/test' ] };
      this.stub(readdir, 'getTreeSync').returns(expected);
      search.init([ 'dir' ], {}, sinon.spy());
      search.getFileTree().should.eql(expected.tree);
      search.getFiles().should.eql(['dir/test']);
    }));

    it ('should exclude the files if they match the exclusion criteria regexp', sinon.test(function() {
      this.stub(fs, 'readdirSync').withArgs('dir').returns([ 'what', 'is' ]);
      this.stub(fs, 'statSync').returns({ isDirectory : function() { return false; }});

      search.init([ 'dir' ], {
        exclude : '.*'
      }, sinon.spy());

      search.getFileTree().should.eql([]);
    }));

    it ('should exclude the files if they match the exclusion criteria', sinon.test(function() {
      this.stub(fs, 'readdirSync').withArgs('dir').returns([ 'what', 'is' ]);
      this.stub(fs, 'statSync').returns({ isDirectory : function() { return false; }});
      search.init([ 'dir' ], {
        exclude : 'is'
      }, sinon.spy());

      search.getFileTree().should.eql([ { name : 'what', target : 'dir/what' } ]);
    }));

    it ('should look at the starting directory if no args is defined', sinon.test(function() {
      this.stub(fs, 'readdirSync').returns([]);
      search.init([], {}, sinon.spy());
      fs.readdirSync.args[0][0].should.eql(process.cwd());
    }));

    it ('should trigger the callback if its done', sinon.test(function() {
      var spy = sinon.spy();
      this.stub(fs, 'readdirSync').returns([]);
      search.init([], {}, spy);
      spy.called.should.be.ok;
    }));
  });
});

