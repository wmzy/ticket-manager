const send = require('koa-send');
const config = require('../config');
const fileService = require('../services/file');

exports.getById = async function (ctx) {
  const file = await fileService.getById(ctx.request.params.id)
  await send(ctx, file.filename, {root: config.uploadPath});
};

exports.upload = async function (ctx) {
  const file = fileService.upload(ctx.state.userId, ctx.req.file);
  ctx.body = {
    url: '/files/' + file.id
  };
};
