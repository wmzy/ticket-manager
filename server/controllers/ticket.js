const _ = require('lodash');
const ticketService = require('../services/ticket');
const acl = require('../acl');

exports.list = async function (ctx) {
  if (acl.hasRole(ctx.state.user, 'admin'))
    return ctx.body = await ticketService.list();

  return ctx.body = await ticketService.listByCreatorId(ctx.state.user);
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
