'use strict';
const Promise = require('bluebird');
const mongoose = require('mongoose');
const {requireGlob} = require('./util');

// init db
mongoose.Promise = Promise;

console.log('begin load models');
const rg = requireGlob('server/models/**/*.model.js')
  .then(console.log.bind(console, 'end load models'));

mongoose.connect('mongodb://localhost/ticket-manager', {promiseLibrary: Promise});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', function () {
  console.log('db connected!');

  require('./initData');

  // init server
  rg.then(() => require('./server'))
});
