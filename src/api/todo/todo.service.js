const CreateTodoDto = require('./dto/create-todo.dto');
const TodoEntity = require('./entity/todo.entity');
const TodoNotFoundException = require('./exception/TodoNotFoundException');
const TodoRepository = require('./todo.repository');

module.exports = class TodoService {
    todoRepository;

    /**
     * @param {TodoRepository} todoRepository
     */
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }

    /**
     * Create todo
     *
     * @param {number} userIdx
     * @param {CreateTodoDto} createDto
     * @returns {Promise<TodoEntity>}
     */
    async createTodo(userIdx, createDto) {
        const todo = await this.todoRepository.insert(userIdx, {
            title: createDto.title,
            contents: createDto.contents,
        });

        return TodoEntity.createToDoEntity(todo);
    }

    /**
     * Get todo by idx
     *
     * @param {number} idx
     */
    async getTodoByIdx(idx) {
        const todo = await this.todoRepository.selectByIdx(idx);

        if (!todo) {
            throw new TodoNotFoundException('Cannot find todo');
        }

        return TodoEntity.createToDoEntity(todo);
    }
};
