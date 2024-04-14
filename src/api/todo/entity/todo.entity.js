const Todo = require('../model/todo.model');

class Author {
    /**
     * @type {number}
     */
    idx;

    /**
     * @type {string}
     */
    nickname;
}

module.exports = class TodoEntity {
    /**
     * @type {number}
     */
    idx;

    /**
     * @type {Author}
     */
    author;

    /**
     * @type {string}
     */
    title;

    /**
     * @type {string}
     */
    contents;

    /**
     * @type {Date}
     */
    createdAt;

    /**
     * @param {{
     *  idx: number;
     *  title: string;
     *  contents: string;
     *  author: Author;
     *  createdAt: Date
     * }} data
     */
    constructor(data) {
        this.idx = data.idx;
        this.title = data.title;
        this.contents = data.contents;
        this.createdAt = data.createdAt;
    }

    /**
     * @param {Todo} todo
     */
    static createToDoEntity(todo) {
        return new TodoEntity({
            idx: todo.idx,
            author: {
                idx: todo.userIdx,
                nickname: todo.userNickname,
            },
            title: todo.title,
            contents: todo.contents,
            createdAt: new Date(todo.createdAt),
        });
    }
};
