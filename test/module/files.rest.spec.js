var file   = require(process.cwd() + '/module/server/rest/file');
var sinon  = require('sinon');
var search = require(process.cwd() + '/module/search');

describe ('file rest', function() {

  describe ('#index', function() {
    it ('should have index method', function() {
      file.index.should.be.instanceOf(Function);
    });

    it ('should return the list of files', sinon.test(function() {
      var spy = sinon.spy();
      this.stub(search, 'getFilesTree').returns([ {} ]);
      file.index(null, {
        send : spy
      });
      spy.args[0][0].should.eql([ {} ]);
    }));
  });

});
