var tooMany = require(process.cwd() + '/module/too-many-files-warning');
var search = require(process.cwd() + '/module/search' );
var sinon = require('sinon');
var prompt = require('prompt');

describe ('too many files warning', function() {

  it ('should have priority 1', function() {
    tooMany.priority.should.eql(1);
  });

  it ('should have init method', function() {
    tooMany.init.should.be.instanceOf(Function);
  });

  it ('should have args', function() {
    tooMany.args.maxFiles.should.be.ok;
  });

  it ('should ask file listing from search ', sinon.test(function() {
    this.stub(search, 'getFiles').returns([]);
    tooMany.init([], {}, sinon.spy());
    search.getFiles.called.should.be.ok;
  }));

  it ('should not prompt the user if files count does not exceed maxFiles property', sinon.test(function() {
    this.stub(search, 'getFiles').returns(Array(20));
    this.stub(prompt, 'start');
    tooMany.init([], { maxFiles : 25 }, sinon.spy());
    prompt.start.called.should.be.not.ok;
  }));

  it ('should prompt the user if files count exceeds maxFiles property', sinon.test(function() {
    this.stub(search, 'getFiles').returns(Array(200));
    this.stub(prompt, 'start');
    tooMany.init([], { maxFiles : 190 }, sinon.spy());
    prompt.start.called.should.be.ok;
  }));

  it ('should ask if the user wants to continue if the files count exceeds maxFiles', sinon.test(function() {
    this.stub(search, 'getFiles').returns(Array(200));
    this.stub(prompt, 'start');
    this.stub(prompt, 'get');
    tooMany.init([], { maxFiles : 190 }, sinon.spy());
    prompt.get.called.should.be.ok;
  }));

  it ('should trigger callback if the files count does not exceed', sinon.test(function() {
    var spy = sinon.spy();
    this.stub(search, 'getFiles').returns(Array(2));
    tooMany.init([], { maxFiles : 200 }, spy);
    spy.called.should.be.ok;
  }));

});
