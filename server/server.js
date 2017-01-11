'use strict';
const koa = require('koa');
const staticServe = require('koa-static');
const bodyParser = require('koa-bodyparser');
const send = require('koa-send');
const config = require('./config');
const router = require('./router');

const app = new koa();

app.use(staticServe(config.staticPath));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(async ctx => {
  if (!ctx.path.startsWith('/api/') && ctx.method === 'GET')
    await send(ctx, 'index.html', {root: config.staticPath});
});

app.listen(config.port);
console.log(`Listening on port ${config.port}`);

module.exports = app;
