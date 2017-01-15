const _ = require('lodash');
const ticketService = require('../services/ticket');

exports.list = async function (ctx) {
  ctx.body = await ticketService.list();
};

exports.getById = async function (ctx) {
  ctx.body = await ticketService.getById(ctx.params.id);
  if (!ctx.body) ctx.throw(404);
};

exports.create = async function (ctx) {
  const doc = _.omit(ctx.request.body, 'id', 'attachments', 'assignee');
  doc.creator = ctx.state.user;
  doc.state = 'open';
  ctx.body = await ticketService.create(doc);
  if (!ctx.body) ctx.throw(404);
};

exports.save = async function (ctx) {
  await ticketService.save(ctx.params.id, ctx.request.body);
};
