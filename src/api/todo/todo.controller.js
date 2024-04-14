const LoginUserEntity = require('../auth/entity/LoginUserEntity');
const CreateTodoDto = require('./dto/create-todo.dto');
const TodoService = require('./todo.service');

module.exports = class TodoController {
    todoService;

    /**
     * @param {TodoService} todoService
     */
    constructor(todoService) {
        this.todoService = todoService;
    }

    async createTodo(req, res) {
        const loginUser = LoginUserEntity.createLoginUserEntity(req.user);
        const createDto = CreateTodoDto.createTodoDto(req.body);

        const todo = await this.todoService.createTodo(loginUser.idx, createDto);

        res.status(200).send({
            todo,
        });
    }
};
