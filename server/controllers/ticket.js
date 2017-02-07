const _ = require('lodash');
const ticketService = require('../services/ticket');
const acl = require('../acl');

exports.list = async function (ctx) {
  const userId = ctx.state.userId;

  const roles = await acl.userRoles(userId);
  if (_.includes(roles, 'admin')) return void(ctx.body = await ticketService.list());
  if (_.includes(roles, 'server')) return void(ctx.body = await ticketService.listByAssignee());

  ctx.body = await ticketService.listByCreatorId(userId);
};

exports.getById = async function (ctx) {
  ctx.body = await ticketService.getById(ctx.params.id);
  if (!ctx.body) ctx.throw(404);
};

exports.create = async function (ctx) {
  const doc = _.omit(ctx.request.body, 'id', 'attachments', 'assignee');
  doc.creator = ctx.state.userId;
  doc.state = 'open';
  ctx.body = await ticketService.create(doc);
  if (!ctx.body) ctx.throw(404);
};

exports.save = async function (ctx) {
  await ticketService.save(ctx.params.id, ctx.request.body);
};
