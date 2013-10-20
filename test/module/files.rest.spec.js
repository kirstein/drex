var file   = require(process.cwd() + '/module/server/rest/file');
var sinon  = require('sinon');
var search = require(process.cwd() + '/module/search');
var fs     = require('fs');

describe ('file rest', function() {

  describe ('#index', function() {
    it ('should have index method', function() {
      file.index.should.be.instanceOf(Function);
    });

    it ('should return the list of files', sinon.test(function() {
      var spy = sinon.spy();
      this.stub(search, 'getFileTree').returns([ {} ]);
      file.index(null, {
        send : spy
      });
      spy.args[0][0].should.eql([ {} ]);
    }));
  });

  describe ('#show', function() {
    it ('should have show method', function() {
      file.show.should.be.instanceOf(Function);
    });

    it ('should return 403 if the search returns false on #isLoadable', sinon.test(function() {
      var spy = sinon.spy();
      this.stub(search, 'isLoadable').returns(false);
      file.show({
        params : {}
      }, {
        send : spy
      });
      spy.args[0].should.eql([ 403 ]);
    }));

    it ('should pipe the file if search returns true on #isLoadable', sinon.test(function() {
      var spy = sinon.spy();
      var res = {};

      this.stub(search, 'isLoadable').returns(true);
      this.stub(fs, 'createReadStream').returns({
        pipe : spy
      });
      file.show({
        params : {}
      }, res);

      spy.called.should.be.ok;
      spy.args[0][0].should.eql(res);
    }));
  });

});
