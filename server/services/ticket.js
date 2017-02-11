const _ = require('lodash');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Ticket = mongoose.model('Ticket');

const list = exports.list = function (query) {
  return Ticket.find(query)
    .sort('-updatedAt')
    .limit(1000)
    .exec();
};

exports.listByCreatorId = async function (creatorId, query) {
  return await list(_.assign(query, {creator: creatorId}));
};

exports.listByAssignee = function (assigneeId, query) {
  return list(_.assign(query, {assignee: assigneeId}));
};

exports.getById = async function (id) {
  return Ticket.findById(id)
    .exec();
};

exports.create = function (doc) {
  return Ticket.create(doc);
};

exports.save = async function (id, doc) {
  const ticket = await Ticket.findById(id);
  if (!ticket) throw new Error('not found');
  _.assign(ticket, doc);
  return ticket.save();
};
