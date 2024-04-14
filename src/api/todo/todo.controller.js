const LoginUserEntity = require('../auth/entity/LoginUserEntity');
const CreateTodoDto = require('./dto/create-todo.dto');
const UpdateTodoDto = require('./dto/update-todo.dto');
const PermissionDeniedException = require('./exception/PermissionDeniedException');
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

    async updateTodo(req, res) {
        const loginUser = LoginUserEntity.createLoginUserEntity(req.user);
        const todoIdx = Number(req.params.idx);

        const todoEntity = await this.todoService.getTodoByIdx(todoIdx);

        if (todoEntity.author.idx !== loginUser.idx) {
            throw new PermissionDeniedException('Permission denied');
        }

        const updateDto = UpdateTodoDto.createUpdateTodoDto(req.body);

        await this.todoService.updateTodoByIdx(todoIdx, updateDto);

        res.status(201).end();
    }
};
