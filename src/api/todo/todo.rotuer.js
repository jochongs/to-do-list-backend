const { Router } = require('express');
const { authMiddleware } = require('../index.middleware');
const wrapper = require('../../common/module/wrapper');
const { todoController } = require('../index.controller');

const todoRouter = Router();

todoRouter.get('/my', wrapper(authMiddleware.isLogin()), wrapper(todoController.getMyTodo));

todoRouter.post('/', wrapper(authMiddleware.isLogin()), wrapper(todoController.createTodo));

todoRouter.put('/:idx', wrapper(authMiddleware.isLogin()), wrapper(todoController.updateTodo));

todoRouter.delete('/:idx', wrapper(authMiddleware.isLogin()), wrapper(todoController.deleteTodo));

module.exports = todoRouter;
