var sinon = require('sinon');
var should = require('should');
var readdir = require(process.cwd() + '/lib/readdir');
var fs = require('fs');

describe ('readdir', function() {

  describe ('#getTreeSync', function() {
    it ('should contain #getTreeSync method', function() {
      readdir.getTreeSync.should.be.instanceOf(Function);
    });

    it ('should throw when no directory is defined', function() {
      (function() {
        readdir.getTreeSync();
      }).should.throw('No directory defined');
    });

    it ('should throw when no directory is null', function() {
      (function() {
        readdir.getTreeSync(null);
      }).should.throw('No directory defined');
    });

    it ('should ask for given directory', sinon.test(function() {
      this.stub(fs, 'readdirSync').returns([]);
      readdir.getTreeSync('something');
      fs.readdirSync.called.should.be.ok;
    }));

    it ('should return an object', sinon.test(function() {
      this.stub(fs, 'readdirSync').returns([ 'hello' ]);
      this.stub(fs, 'statSync').returns({ isDirectory : function() { return false; } });
      readdir.getTreeSync('something').should.have.type('object');
    }));

    it ('should validate the file if the validation function is defined', sinon.test(function() {
      var spy = sinon.stub().returns(false);
      this.stub(fs, 'readdirSync').returns([ 'hello' ]);
      readdir.getTreeSync('something', spy);
      spy.called.should.be.ok;
    }));

    it ('should ask for statSync', sinon.test(function() {
      this.stub(fs, 'readdirSync').returns([ 'hello' ]);
      this.stub(fs, 'statSync').returns({ isDirectory : function() { return false; } });
      readdir.getTreeSync('something');
      fs.statSync.called.should.be.ok;
    }));

    it ('should return an object with tree and files keys', sinon.test(function() {
      this.stub(fs, 'readdirSync').returns([ 'hello' ]);
      this.stub(fs, 'statSync').returns({ isDirectory : function() { return false; } });
      readdir.getTreeSync('something').tree.should.be.ok;
      readdir.getTreeSync('something').files.should.be.ok;
    }));

    it ('should return an a tree object that contain an array of objects', sinon.test(function() {
      this.stub(fs, 'readdirSync').returns([ 'hello' ]);
      this.stub(fs, 'statSync').returns({ isDirectory : function() { return false; } });
      readdir.getTreeSync('something').tree[0].should.have.type('object');
    }));

    it ('should return an files array that contains direct file names', sinon.test(function() {
      this.stub(fs, 'readdirSync').returns([ 'hello' ]);
      this.stub(fs, 'statSync').returns({ isDirectory : function() { return false; } });
      readdir.getTreeSync('something').files.should.eql([ 'something/hello' ]);
    }));

    it ('should return recursive results', sinon.test(function() {
      var calls = 0;
      this.stub(fs, 'readdirSync').returns([ 'wat', 'test' ]);
      this.stub(fs, 'statSync').returns({ isDirectory: function() { return ++calls === 1; } });

      var result = readdir.getTreeSync('something');

      result.tree.should.eql([ {
        name   : 'wat',
        target : 'something/wat',
        children : [
          { name: 'wat', target: 'something/wat/wat' },
          { name: 'test', target: 'something/wat/test' }
        ]
      }, {
        name : 'test',
        target : 'something/test'
      }]);

      result.files.should.eql([ 'something/wat/wat', 'something/wat/test', 'something/test' ]);
    }));
  });

  describe ('#getFilesSync', function() {

    it ('should contain #getFilesSync method', function() {
      readdir.getFilesSync.should.be.instanceOf(Function);
    });

    it ('should throw when no directory is defined', function() {
      (function() {
        readdir.getFilesSync();
      }).should.throw('No directory defined');
    });

    it ('should throw when directory is null', function() {
      (function() {
        readdir.getFilesSync(null);
      }).should.throw('No directory defined');
    });

    it ('should ask for readdirSync with the given directory', sinon.test(function() {
      this.stub(fs, 'readdirSync').returns([]);
      readdir.getFilesSync('some-place');
      fs.readdirSync.args[0].should.eql(['some-place']);
    }));

    it ('should return the data received', sinon.test(function() {
      this.stub(fs, 'readdirSync').returns([ 'something' ]);
      this.stub(fs, 'statSync').returns({ isDirectory: function() { return false; } });
      readdir.getFilesSync('some-place').should.eql(['some-place/something']);
    }));

    it ('should call the validate method on each file', sinon.test(function() {
      var spy = sinon.spy();
      this.stub(fs, 'readdirSync').returns([ 'something', 'wat' ]);
      readdir.getFilesSync('some-place', spy);
      spy.calledTwice.should.be.ok;
    }));

    it ('should exclude files that do not pass validate', sinon.test(function() {
      this.stub(fs, 'readdirSync').returns([ 'something', 'wat' ]);
      this.stub(fs, 'statSync').returns({ isDirectory: function() { return false; } });
      var files = readdir.getFilesSync('some-place', function(val) {
        return val === 'wat';
      });

      files.should.eql([ 'some-place/wat' ]);
    }));

    it ('should exclude files that start with . with recursive', sinon.test(function() {
      this.stub(fs, 'readdirSync').returns([ 'something', '.wat' ]);
      this.stub(fs, 'statSync').returns({ isDirectory: function() { return false; } });
      var files = readdir.getFilesSync('some-place', function(val) {
        return !new RegExp('^\\.').test(val);
      });

      files.should.eql([ 'some-place/something' ]);
    }));

    it ('should ask for sync stat is for each file', sinon.test(function() {
      this.stub(fs, 'readdirSync').returns([ 'something', 'wat' ]);
      this.stub(fs, 'statSync').returns({ isDirectory: function() { return false; } });
      readdir.getFilesSync('some-place');
      fs.statSync.calledTwice.should.be.ok;
    }));

    it ('should ask for dir listing and stat again if isDirectory returns true', sinon.test(function() {
      var calls = 0;
      this.stub(fs, 'readdirSync').returns([ 'wat' ]);
      this.stub(fs, 'statSync').returns({ isDirectory: function() { return ++calls === 1; } });
      readdir.getFilesSync('some-place');
      fs.readdirSync.calledTwice.should.be.ok;
      fs.statSync.calledTwice.should.be.ok;
    }));

    it ('should ask for validation rule for each recursive step', sinon.test(function() {
      var calls = 0;
      var spy   = sinon.spy();
      this.stub(fs, 'readdirSync').returns([ 'wat' ]);
      this.stub(fs, 'statSync').returns({ isDirectory: function() { return ++calls === 1; } });
      readdir.getFilesSync('some-place', function() {
        spy();
        return true;
      });

      spy.calledTwice.should.be.ok;
    }));

    it ('should return recursive results', sinon.test(function() {
      var calls = 0;
      this.stub(fs, 'readdirSync').returns([ 'wat', 'herro' ]);
      this.stub(fs, 'statSync').returns({ isDirectory: function() { return ++calls === 1; } });
      readdir.getFilesSync('some-place').should.eql([ 'some-place/wat/wat', 'some-place/wat/herro', 'some-place/herro' ]);
    }));
  });
});

