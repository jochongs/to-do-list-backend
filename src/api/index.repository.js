const pgPool = require('../common/database/pgPool');
const TodoRepository = require('./todo/todo.repository');
const UserRepository = require('./user/user.repository');

const todoRepository = new TodoRepository(pgPool);
const userRepository = new UserRepository(pgPool);

module.exports = {
    todoRepository,
    userRepository,
};
