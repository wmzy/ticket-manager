'use strict';
const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const config = require('./config');
const jwtMiddleware = require('koa-jwt')({secret: config.jwtSecret, key: 'userId'});
const multer = require('koa-multer');

const upload = multer({dest: config.uploadPath});

const ticketController = require('./controllers/ticket');
const userController = require('./controllers/user');
const authController = require('./controllers/auth');
const fileController = require('./controllers/file');

const router = new Router({prefix: '/api/v1'});

const currentUserRouter = new Router({prefix: '/user'})
  .use(jwtMiddleware)
  .get('/tickets', ticketController.myList);

router.use(currentUserRouter.routes());

const ticketRouter = new Router({prefix: '/tickets'})
  .use(jwtMiddleware)
  .get('/', ticketController.list)
  .get('/:id', ticketController.getById)
  .put('/:id', ticketController.save)
  .post('/', ticketController.create);

router.use(ticketRouter.routes());

const fileRouter = new Router({prefix: '/files'})
  .use(jwtMiddleware)
  .get('/:id', fileController.getById)
  .post('/', upload.single('file'), fileController.upload);

router.use(fileRouter.routes());

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
