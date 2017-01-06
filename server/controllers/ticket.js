const ticketService = require('../services/ticket');

exports.list = async function (ctx) {
  ctx.body = await ticketService.list();
};

exports.getById = async function (ctx) {
  ctx.body = await ticketService.getById(ctx.params.id);
  if (!ctx.body) ctx.throw(404);
};

exports.create = async function (ctx) {
  ctx.body = await ticketService.create(ctx.request.body);
  if (!ctx.body) ctx.throw(404);
};

exports.save = async function (ctx) {
  await ticketService.save(ctx.params.id, ctx.request.body);
};
