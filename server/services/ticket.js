const _ = require('lodash');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Ticket = mongoose.model('Ticket');

function list(query) {
  return Ticket.find(query)
    .sort('-updatedAt')
    .limit(1000);
}
exports.list = function (query) {
  return list(query)
    .populate('assignee', 'username')
    .populate('creator', 'username')
    .exec();
};

exports.listByCreatorId = async function (creatorId, query) {
  return await list(_.assign(query, {creator: creatorId}))
    .populate('assignee', 'username')
    .exec();
};

exports.listByAssignee = function (assigneeId, query) {
  return list(_.assign(query, {assignee: assigneeId}))
    .populate('creator', 'username')
    .exec();
};

exports.getById = async function (id) {
  return Ticket.findById(id)
    .populate('assignee', 'username')
    .populate('creator', 'username')
    .exec();
};

exports.create = function (doc) {
  return Ticket.create(doc);
};

exports.save = async function (id, doc) {
  const ticket = await Ticket.findById(id);
  if (!ticket) throw new Error('not found');
  doc._id = id;
  doc.updatedAt = Date.now();
  _.assign(ticket, doc);
  return ticket.save();
};
