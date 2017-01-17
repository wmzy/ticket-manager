const _ = require('lodash');
const mongoose = require('mongoose');
const Acl = require('acl');
const MongodbBackend = Acl.mongodbBackend;

const con = mongoose.connection;
let db;
if (con.db) {
  db = con.db;
} else {
  db = {};
  mongoose.connection.once('open', function () {
    _.assign(db, con.db);
  });

}
module.exports = new Acl(new MongodbBackend(db, 'acl_'));
