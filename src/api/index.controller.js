const { authService, userService, todoService } = require('./index.service');
const AuthController = require('./auth/auth.controller');
const TodoController = require('./todo/todo.controller');
const UserController = require('./user/user.controller');

const authController = new AuthController(authService);
const userContorller = new UserController(userService);
const todoController = new TodoController(todoService);

module.exports = {
    authController,
    userContorller,
    todoController,
};
