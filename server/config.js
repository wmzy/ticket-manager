'use strict';
let path = require('path');
let environment = process.env.NODE_ENV || 'production';

let localStaticPath = environment == 'production' ? '../client' : '../dist/client';
module.exports = {
  env: environment,
  port: process.env.PORT || 9000,
  staticPath: path.resolve(__dirname, localStaticPath),
  uploadPath: path.resolve(__dirname, 'uploads'),
  jwtSecret: process.env.JWT_SECRET || 'ticket-manager-secret',
  admin: {
    username: 'admin',
    nick: 'admin',
    email: 'admin@email.com',
    password: 'aaaaaaa'
  }
};
