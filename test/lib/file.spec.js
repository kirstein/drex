var file = require(process.cwd() + '/lib/file');

describe ('file lib', function() {
  describe ('#parse', function() {

    it ('should contain parse method', function () {
      file.parse.should.be.instanceOf(Function);
    });

    it ('should return empty string when dealing with empty input', function() {
      file.parse().should.eql('');
    });

    it ('should replace dashes with slashes', function() {
      file.parse('-wat-wat').should.eql('/wat/wat');
    });

    it ('should replace $dot$ with dots', function() {
      file.parse('-wat-wat$dot$json').should.eql('/wat/wat.json');
    });
  });
});
