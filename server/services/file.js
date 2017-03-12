const _ = require('lodash');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const File = mongoose.model('File');

exports.getById = function (id) {
  return File.findById(id);
};

exports.upload = function (userId, file) {
  const f = new File(file);
  f.creator = ObjectId(userId);
  return f.save();
};
