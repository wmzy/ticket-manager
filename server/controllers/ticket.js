const _ = require('lodash');
const ticketService = require('../services/ticket');
const replyService = require('../services/reply');
const acl = require('../acl');

exports.list = async function (ctx) {
  ctx.body = await ticketService.list();
};

exports.listReplies = async function (ctx) {
  ctx.body = await replyService.getReplies(ctx.params.id);
};

exports.myList = async function (ctx) {
  const userId = ctx.state.userId;
  const query = _.pick(ctx.query, 'state');

  const roles = await acl.userRoles(userId);
  if (_.includes(roles, 'admin')) return void(ctx.body = await ticketService.list(query));
  if (_.includes(roles, 'assignee')) return void(ctx.body = await ticketService.listByAssignee(query));

  ctx.body = await ticketService.listByCreatorId(userId, query);
};

exports.getById = async function (ctx) {
  ctx.body = await ticketService.getById(ctx.params.id);
  if (!ctx.body) ctx.throw(404);
};

exports.create = async function (ctx) {
  const doc = _.omit(ctx.request.body, 'id');
  doc.creator = ctx.state.userId;
  doc.state = 'open';
  ctx.body = await ticketService.create(doc);
  if (!ctx.body) ctx.throw(404);
};

exports.save = async function (ctx) {
  ctx.body = await ticketService.save(ctx.params.id, ctx.request.body);
};
