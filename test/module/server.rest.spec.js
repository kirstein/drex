var rest  = require(process.cwd() + '/module/server/rest');
var sinon = require('sinon');
var fs    = require('fs');
var mockery = require('mockery');

describe ('server resources', function() {

  beforeEach(function() {
    mockery.enable();
  });

  afterEach(function() {
    mockery.disable();
  });

  it ('should be defined', function() {
    rest.should.be.instanceOf(Function);
  });

  it ('should call readdirSync on rest folder', sinon.test(function() {
    this.stub(fs, 'readdirSync').withArgs(process.cwd() + '/module/server/rest/').returns([]);
    rest();
    fs.readdirSync.called.should.be.ok;
  }));

  it ('should return an array of resources', sinon.test(function() {
    this.stub(fs, 'readdirSync').returns([]);
    rest().should.be.eql([]);
  }));

  it ('should register resources to given app', sinon.test(function() {
    var resourceMock    = sinon.spy();
    var somethingModule = function() {};

    mockery.registerMock(process.cwd() + '/module/server/rest/something', somethingModule);
    this.stub(fs, 'readdirSync').returns([ 'something' ]);
    rest({
      resource : resourceMock
    });

    resourceMock.calledOnce.should.be.ok;
    resourceMock.args[0].should.eql(['rest/something', somethingModule]);
  }));

  it ('should skip files that start with .', sinon.test(function() {
    var resourceMock = sinon.spy();

    this.stub(fs, 'readdirSync').returns([ '.something' ]);
    rest({
      resource : resourceMock
    });

    resourceMock.called.should.not.be.ok;
  }));

});

