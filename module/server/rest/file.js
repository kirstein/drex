var search = require('../../search');

exports.index = function(req, res){
  res.send(search.getFileTree());
};

exports.show = function(req, res){
  res.send('file file ' + req.params.file);
};

exports.edit = function(req, res){
  res.send('edit file ' + req.params.file);
};

exports.update = function(req, res){
  res.send('update file ' + req.params.file);
};
