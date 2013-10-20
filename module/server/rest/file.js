var search  = require('../../search');
var fileLib = require('../../../lib/file');
var fs      = require('fs');

exports.index = function(req, res){
  res.send(search.getFileTree());
};

exports.show = function(req, res){
  var file = fileLib.parse(req.params.file);
  if (search.isLoadable(file)) {
    return fs.createReadStream(file).pipe(res);
  }
  res.send(403);
};

exports.edit = function(req, res){
  res.send('edit file ' + req.params.file);
};

exports.update = function(req, res){
  res.send('update file ' + req.params.file);
};
