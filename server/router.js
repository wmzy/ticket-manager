'use strict';
const router = require('koa-router')();
const jwt = require('jsonwebtoken');
const config = require('./config');
const jwtMiddleware = require('koa-jwt')({secret: config.jwtSecret});

const ticketController = require('./controllers/ticket');
const authController = require('./controllers/auth');

router.get('/tickets', ticketController.list);
router.get('/tickets/:id', ticketController.getById);
router.put('/tickets/:id', jwtMiddleware, ticketController.save);
router.post('/tickets', jwtMiddleware, ticketController.create);

router.put('/login', authController.login);
router.post('/sign-up', authController.singUp);

module.exports = router;
