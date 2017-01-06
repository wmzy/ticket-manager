const jwt = require('jsonwebtoken');
const config = require('../config');
const userService = require('../services/user');

exports.login = async function (ctx) {
  const {symbol, password} = ctx.request.body;

  const user = await userService.getBySymbol(symbol);

  if (!user || !user.authenticate(password)) {
    return ctx.throw(400, 'password error')
  }

  ctx.body = {
    authToken: jwt.sign(_.pick(user, username), config.jwtSecret)
  };
};

exports.singUp = function (ctx) {
  // const {confirmPassword, ...body} = ctx.request.body;
  const body = ctx.request.body;
  if (body.confirmPassword !== body.password) return ctx.throw(400);

  delete body.confirmPassword;
  return userService.create(body);
};

