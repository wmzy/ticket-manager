'use strict';
const koa = require('koa');
const staticServe = require('koa-static');
const bodyParser = require('koa-bodyparser');
const config = require('./config');
const router = require('./router');

const app = koa();

app.use(staticServe(config.staticPath));

app.use(bodyParser());
app.use(router.routes());

app.listen(config.port);
console.log(`Listening on port ${config.port}`);
