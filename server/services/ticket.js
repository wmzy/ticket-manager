const _ = require('lodash');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Ticket = mongoose.model('Ticket');

const list = exports.list = function (query) {
  return Ticket.find(query)
    .limit(1000)
    .exec();
};

exports.listByCreatorId = async function (creatorId) {
  return await list({creator: creatorId});
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
