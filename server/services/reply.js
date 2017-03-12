const _ = require('lodash');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Reply = mongoose.model('Reply');

exports.getById = function (id) {
  return Reply.findById(id).exec();
};

exports.create = function (body, userId) {
  const reply = new Reply(body);
  reply.ticket = ObjectId(body.ticketId);
  reply.creator = ObjectId(userId);
  return reply.save();
};

exports.save = function (id, body) {
  return Reply.findById(id).exec()
    .then(reply => _.assign(reply, _.omit(body, '_id')))
    .then(reply => reply.save());
};

exports.remove = function (id) {
  return Reply.findByIdAndRemove(id).exec();
};
