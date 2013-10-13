var server = require(process.cwd() + "/module/server");
var should = require('should');
var sinon = require('sinon');
var http  = require('http');

describe ('server mod', function() {

  describe ('#args', function() {
    it ('should have args', function() {
      server.args.should.be.instanceOf(Object);
    });

    it ('should have port args', function() {
      server.args.port.should.be.ok;
    });
  });

  describe ('#init', function() {
    it ('should have inti function', function() {
      server.init.should.be.instanceOf(Function);
    });

    it ('should start the server', sinon.test(function() {
      this.stub(http, 'createServer').returns({
        listen : function() {}
      });
      server.init([], { port: 3003 });
      http.createServer.called.should.be.ok;
    }));

    it ('should start the server with given port', sinon.test(function() {
      var spy = sinon.spy();
      this.stub(http, 'createServer').returns({
        listen : spy
      });
      server.init([], { port: 3003 });
      spy.args[0][0].should.eql(3003);
    }));
  });
});
