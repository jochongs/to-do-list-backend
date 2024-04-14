const CreateTodoDao = require('./dao/create-todo.dao');
const UpdateTodoDao = require('./dao/update-todo.dao');
const Todo = require('./model/todo.model');

module.exports = class TodoRepository {
    /**
     * @type {import('pg').Pool}
     */
    pool;

    /**
     * @param {import('pg').Pool} pool
     */
    constructor(pool) {
        this.pool = pool;
    }

    /**
     * Select todo by idx
     *
     * @param {number} idx
     * @param {import('pg').PoolClient | undefined} conn
     * @returns {Promise<Todo | null>}
     */
    async selectByIdx(idx, conn = this.pool) {
        const queryResult = await conn.query(
            `SELECT
                idx,
                user_idx AS "userIdx",
                user_tb.nickname AS "userNickname",
                title,
                contents,
                created_at AS "createAt",
                deleted_at AS "deletedAt"
            FROM
                todo_tb
            JOIN
                user_tb
            ON
                user_tb.idx = todo_tb.user_idx
            WHERE
                idx = $1
            AND
                deleted_at IS NULL`,
            [idx]
        );

        return queryResult.rows[0] || null;
    }

    /**
     * Insert todo
     *
     * @param {number} userIdx
     * @param {CreateTodoDao} createDao
     * @param {import('pg').PoolClient | undefined} conn
     * @returns {Promise<Todo>}
     */
    async insert(userIdx, createDao, conn = this.pool) {
        const queryResult = await conn.query(
            `INSERT INTO todo_tb
                (user_idx, title, contens)
            VALUES
                ($1, $2, $3)
            RETURNING
                idx,
                user_idx AS "userIdx",
                user_tb.nickname AS "userNickname",
                title,
                contents,
                created_at AS "createdAt",
                deleted_at AS "deletedAt"
            JOIN
                user_tb
            ON
                user_tb.idx = todo_tb.user_idx`,
            [userIdx, createDao.title, createDao.contents]
        );

        return queryResult.rows[0];
    }

    /**
     * Update todo by idx
     *
     * @param {number} idx
     * @param {UpdateTodoDao} updateDao
     * @param {import('pg').PoolClient | undefined} conn
     * @returns {Promise<void>}
     */
    async updateByIdx(idx, updateDao, conn = this.pool) {
        await conn.query(
            `UPDATE 
                todo_tb
            SET
                title = $2,
                contents = $3
            WHERE
                idx = $1`,
            [idx, updateDao.title, updateDao.contents]
        );
    }

    /**
     * Delete todo by idx
     * Soft delete
     *
     * @param {number} idx
     * @param {import('pg').PoolClient | undefined} conn
     * @return
     */
    async deleteByIdx(idx, conn = this.pool) {
        await conn.query(
            `UPDATE
                todo_tb
            SET
                deleted_at = NOW()
            WHERE
                idx = $1`,
            [idx]
        );
    }
};
