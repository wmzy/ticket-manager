const f = require('lodash/fp');
const _ = require('lodash');
const mongoose = require('mongoose');
const acl = require('../acl');
const config = require('../config');

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
  return User.find(query)
    .nor([{state: 'removed'}, {username: config.admin.username}]);
};

exports.assigneeList = async function () {
  const userIds = await acl.roleUsers('assignee');
  return User.find()
    .select('username')
    .in('_id', userIds)
    .exec();
};

exports.listWithRoles = function (query) {
  return exports.list(query)
    .then(f.map(u => acl.userRoles(u.id).then(r => _.set(u.toJSON(), 'role', r[0]))))
    .then(promises => Promise.all(promises));
};

exports.getById = function (id) {
  return User.findById(id);
};

exports.create = function (doc) {
  return User.create(doc);
};

exports.setRole = async function (userId, role) {
  await acl.removeUserRoles(userId, ['assignee', 'customer']);
  await acl.addUserRoles(userId, role);
};

exports.remove = function (userId) {
  return User.findByIdAndUpdate(userId, {state: 'removed'});
};
