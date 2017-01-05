'use strict';
const koa = require('koa');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const staticServe = require('koa-static');
const bodyParser = require('koa-bodyparser');
const {requireGlob} = require('./util');
const config = require('./config');
const router = require('./router');

mongoose.Promise = Promise;

const app = new koa();

app.use(staticServe(config.staticPath));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());


console.log('begin load models');
const rg = requireGlob('server/models/**/*.model.js')
  .then(console.log.bind(console, 'end load models'));

mongoose.connect('mongodb://localhost/ticket-manager', {promiseLibrary: Promise});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', function () {
  console.log('db connected!');
  rg.then(() => {
    app.listen(config.port);
    console.log(`Listening on port ${config.port}`);
  })
});
