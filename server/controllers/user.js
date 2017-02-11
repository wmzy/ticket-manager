const jwt = require('jsonwebtoken');
const config = require('../config');
const userService = require('../services/user');
const acl = require('../acl');

exports.list = async function (ctx) {

  const userId = ctx.state.userId;

  if (!await acl.isAllowed(userId, 'users', 'list'))
    return ctx.throw(403);

  ctx.body = await userService.listWithRoles();
};

exports.remove = async function (ctx) {
  const userId = ctx.state.userId;

  if (!await acl.isAllowed(userId, 'users', 'list')) return ctx.throw(403);

  await userService.remove(ctx.params.id);
  ctx.body = null;
};

exports.setRole = async function (ctx) {
  const userId = ctx.state.userId;

  if (!await acl.isAllowed(userId, 'users', 'edit')) return ctx.throw(403);

  await userService.setRole(ctx.params.id, ctx.request.body.role);
  ctx.body = null;
};

