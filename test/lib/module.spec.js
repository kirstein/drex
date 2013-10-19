var mod = require(process.cwd() + '/lib/module');
var fs  = require('fs');
var sinon = require('sinon');
var mockery = require('mockery');

describe ('module lib', function() {

  describe ('#initModules', function() {
    it ('should have initModules function', function() {
      mod.initModules.should.be.instanceOf(Function);
    });

    it ('should init all given modules with init keyword', function() {
      var one = { init : sinon.stub() };
      mod.initModules([ one ]);
      one.init.called.should.be.ok;
    });

    it ('should pass args and options to module', function() {
      var one = { init : sinon.stub() };
      mod.initModules([ one ], 'args', 'options');
      one.init.args[0].should.contain('args', 'options');
    });

    it ('should load modules in the same order they were passed', function(done) {
      var spy = sinon.spy();
      var one = { init : function(a, b, cb){ spy(); cb(); } };
      var two = { init : function() { done(); } };
      mod.initModules([ one, two ]);
      spy.called.should.be.ok;
    });

    it ('should load the next module only and only if the previous module has triggered callback', function() {
      var one = { init : function(args, options, cb) {} }; // don't trigger the callback
      var two = { init : sinon.stub() };
      mod.initModules([ one, two ]);
      two.init.called.should.be.not.ok;
    });

    it ('should stop the modules that do not have init function', function() {
      var oneSpy = sinon.spy();
      var twoSpy = sinon.spy();

      var one = { init : function(args, options, cb) { oneSpy(); cb(); } };
      var two = {};
      var three = { init : function(args, options, cb) { twoSpy(); cb(); } };
      mod.initModules([ one, two, three ]);

      oneSpy.called.should.be.ok;
      twoSpy.called.should.be.ok;
    });
  });

  describe ('#getArguments', function() {
    it ('should have getArguments function', function() {
      mod.getArguments.should.be.instanceOf(Function);
    });

    it ('should return a combined object with module args', function() {
      mod.getArguments([ { args : { hello : 'kitty' } }, { args : { wat : 'hello' } } ]).should.eql({ hello : 'kitty', wat : 'hello' });
    });

    it ('should ignore modules with no args', function() {
      mod.getArguments([ { args : { hello : 'kitty' } }, {} ]).should.eql({ hello : 'kitty' });
    });

    it ('should return an object if no args are being passed', function() {
      mod.getArguments([]).should.eql({});
    });
  });

  describe ('#loadModulesSync', function() {

    beforeEach(function() {
      mockery.enable();
    });

    afterEach(function() {
      mockery.disable();
    });

    it ('should have loadModulesSync function', function() {
      mod.loadModulesSync.should.be.instanceOf(Function);
    });

    it ('should ask modules from modules directory', sinon.test(function() {
      this.stub(fs, 'readdirSync').returns([]);
      mod.loadModulesSync('dir');
      fs.readdirSync.args[0].should.eql(['dir']);
    }));

    it ('should require the received modules', sinon.test(function() {
      var someModule = {};
      var dir        = 'hello';

      this.stub(fs, 'readdirSync').returns([ 'some' ]);
      mockery.registerMock(dir + '/some', someModule);
      mod.loadModulesSync(dir).should.contain(someModule);
    }));

    it ('should sort modules by their priority setting', sinon.test(function() {
      var first = { priority : 0 };
      var second = { priority : 5 };
      var last = { priority: 12 };
      var dir = 'hello';

      this.stub(fs, 'readdirSync').returns([ 'last', 'first', 'second' ]);
      mockery.registerMock(dir + '/second', second);
      mockery.registerMock(dir + '/first', first);
      mockery.registerMock(dir + '/last', last);

      var res = mod.loadModulesSync(dir);
      res[0].should.eql(first);
      res[1].should.eql(second);
      res[2].should.eql(last);
    }));

    it ('should sort modules by their priority setting (leaving the ones with undefined priority as last)', sinon.test(function() {
      var first = { priority : 0 };
      var last = {};
      var dir = 'hello';

      this.stub(fs, 'readdirSync').returns([ 'last', 'first' ]);
      mockery.registerMock(dir + '/first', first);
      mockery.registerMock(dir + '/last', last);

      var res = mod.loadModulesSync(dir);
      res[0].should.eql(first);
      res[1].should.eql(last);
    }));

  });
});
