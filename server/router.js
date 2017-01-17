'use strict';
const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const config = require('./config');
const jwtMiddleware = require('koa-jwt')({secret: config.jwtSecret, key: 'userId'});

const ticketController = require('./controllers/ticket');
const authController = require('./controllers/auth');

const router = new Router({prefix: '/api/v1'});

const ticketRouter = new Router({prefix: '/tickets'})
  .get('/', ticketController.list)
  .get('/:id', ticketController.getById)
  .put('/:id', jwtMiddleware, ticketController.save)
  .post('/', jwtMiddleware, ticketController.create);

router.use(ticketRouter.routes());

const authRouter = new Router()
  .put('/login', authController.login)
  .post('/sign-up', authController.singUp);

router.use(authRouter.routes());

module.exports = router;
