var sinon = require('sinon');
var should = require('should');
var readdir = require(process.cwd() + '/lib/readdir');
var fs = require('fs');

describe ('readdir', function() {

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
        return val === 'some-place/wat';
      });

      files.should.eql([ 'some-place/wat' ]);
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

