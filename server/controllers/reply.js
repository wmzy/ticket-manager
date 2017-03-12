const _ = require('lodash');
const replyService = require('../services/reply');

exports.getById = async function (ctx) {
  ctx.body = await replyService.getById(ctx.params.id);
};

exports.create = async function (ctx) {
  ctx.body = await replyService.create(ctx.request.body, ctx.state.userId);
};

exports.save = async function (ctx) {
  ctx.body = await replyService.save(ctx.params.id, ctx.request.body);
};

exports.remove = async function (ctx) {
  ctx.body = await replyService.remove(ctx.params.id);
};
