const jwt = require('jsonwebtoken');
const config = require('../config');
const userService = require('../services/user');
const authService = require('../services/auth');

exports.login = async function (ctx) {
  const {symbol, password} = ctx.request.body;

  const user = await userService.getBySymbol(symbol);

  if (!user || !user.authenticate(password)) {
    return ctx.throw(400, 'password error')
  }

  ctx.body = {
    authToken: jwt.sign(user.id, config.jwtSecret)
  };
};

exports.singUp = async function (ctx) {
  const body = ctx.request.body;
  const user = await userService.create(body);
  ctx.body = {
    authToken: jwt.sign(user.id, config.jwtSecret)
  };
};

exports.resourcePermissions = function (ctx) {
  return authService.getResourcePermissions(ctx.state.userId);
};
