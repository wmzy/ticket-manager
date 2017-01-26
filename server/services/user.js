const mongoose = require('mongoose');

const User = mongoose.model('User');

exports.getByUsername = function (username) {
  return User.findOne({username}).exec();
};

exports.getByMobile = function (mobile) {
  return User.findOne({mobile}).exec();
};

exports.getByEmail = function (email) {
  return User.findOne({email}).exec();
};

exports.getBySymbol = function (symbol) {
  if (symbol.includes('@')) return exports.getByEmail(symbol);
  if (/^\d{11}$/.test(symbol)) return exports.getByMobile(symbol);

  return exports.getByUsername(symbol);
};

exports.list = function (query) {
  return User.find(query);
};

exports.getById = function (id) {
  return User.findById(id);
};

exports.create = function (doc) {
  return User.create(doc);
};

exports.remove = function (userId) {
  return User.findByIdAndUpdate(userId, {state: 'removed'});
};
