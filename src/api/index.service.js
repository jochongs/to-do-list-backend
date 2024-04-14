const { todoRepository, userRepository } = require('./index.repository');
const HashService = require('../common/hash.service');
const JwtService = require('../common/jwt.service');
const AuthService = require('./auth/auth.service');
const TodoService = require('./todo/todo.service');
const UserService = require('./user/user.service');

const hashService = new HashService();
const jwtService = new JwtService();

const todoService = new TodoService(todoRepository);
const userService = new UserService(userRepository, hashService);
const authService = new AuthService(userRepository, jwtService, userService, hashService);

module.exports = {
    hashService,
    jwtService,
    todoService,
    userService,
    authService,
};
