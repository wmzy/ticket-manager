'use strict';
const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const config = require('./config');
const jwtMiddleware = require('koa-jwt')({secret: config.jwtSecret, key: 'userId'});

const ticketController = require('./controllers/ticket');
const userController = require('./controllers/user');
const authController = require('./controllers/auth');

const router = new Router({prefix: '/api/v1'});

const currentUserRouter = new Router({prefix: '/user'})
  .use(jwtMiddleware)
  .get('/tickets', ticketController.myList);

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
  .get('/assignees', userController.assigneeList)
  .put('/:id/role', userController.setRole)
  .delete('/:id', userController.remove);

router.use(userRouter.routes());

const authRouter = new Router()
  .put('/login', authController.login)
  .post('/sign-up', authController.singUp)
  .get('/auth-info', jwtMiddleware, authController.info);

router.use(authRouter.routes());

module.exports = router;
