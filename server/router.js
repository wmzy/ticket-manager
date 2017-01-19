'use strict';
const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const config = require('./config');
const jwtMiddleware = require('koa-jwt')({secret: config.jwtSecret, key: 'userId'});

const ticketController = require('./controllers/ticket');
const userController = require('./controllers/user');
const authController = require('./controllers/auth');

const router = new Router({prefix: '/api/v1'});

const ticketRouter = new Router({prefix: '/tickets'})
  .use(jwtMiddleware)
  .get('/', ticketController.list)
  .get('/:id', ticketController.getById)
  .put('/:id', ticketController.save)
  .post('/', ticketController.create);

router.use(ticketRouter.routes());

const userRouter = new Router({prefix: '/users'})
  .use(jwtMiddleware)
  .get('/', userController.list)
  .delete('/:id', userController.remove);

router.use(userRouter.routes());

const authRouter = new Router()
  .get('/resource-permissions', authController.resourcePermissions)
  .put('/login', authController.login)
  .post('/sign-up', authController.singUp);

router.use(authRouter.routes());

module.exports = router;
