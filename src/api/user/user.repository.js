const InsertUserDao = require('./dao/insert-user.dao');
const UpdateUserDao = require('./dao/update-user.dao');
const UserNotFoundException = require('./exception/UserNotFoundException');

module.exports = class UserRepository {
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
     * Select user by idx
     *
     * @param {number} idx
     * @param {import('pg').PoolClient | undefined} conn
     * @return {Promise<User | null>}
     */
    async selectUserByIdx(idx, conn = this.pool) {
        const queryResult = await conn.query(
            `SELECT 
                idx,
                id,
                pw,
                nickname,
                created_at AS "createdAt",
                deleted_at AS "deletedAt"
            FROM
                user_tb
            FROM
                user_tb
            WHERE
                idx = $1
            AND
                deleted_at IS NULL`,
            [idx]
        );

        return queryResult.rows[0] || null;
    }

    /**
     * Select by user id
     *
     * @param {string} id
     * @param {import('pg').PoolClient | undefined} conn
     * @return {Promise<User | null>}
     */
    async selectUserById(id, conn = this.pool) {
        const queryResult = await conn.query(
            `SELECT
                idx,
                nickname,
                id,
                pw,
                created_at AS "createdAt",
                deleted_at AS "deletedAt"
            FROM
                user_tb
            WHERE
                id = $1,
            AND
                deleted_at IS NULL`,
            [id]
        );

        return queryResult.rows[0];
    }

    /**
     * Insert user by idx
     *
     * @param {InsertUserDao} insertDao
     * @param {import('pg').PoolClient | undefined} conn
     * @param {Promise<User>}
     */
    async insertUser(insertDao, conn = this.pool) {
        const queryResult = await conn.query(
            `INSERT INTO user_tb 
                (id, nickname, pw) 
                    VALUES 
                ($1, $2, $3)
            RETURNING
                idx,
                id,
                pw,
                nickname,
                created_at AS "createdAt",
                deleted_at AS "deletedAt"`,
            [insertDao.id, insertDao.nickname, insertDao.pw]
        );

        return queryResult.rows[0];
    }

    /**
     * Update user by idx
     *
     * @param {number} idx
     * @param {UpdateUserDao} updateDao
     * @param {import('pg').PoolClient | undefined} conn
     * @returns {Promise<void>}
     */
    async updateUserByIdx(idx, updateDao, conn = this.pool) {
        await conn.query(
            `UPDATE 
                user_tb
            SET 
                nickname = $2,
                id = $3,
                pw = $4
            WHERE
                idx = $1`,
            [idx, updateDao.nickname, updateDao.id, updateDao.pw]
        );
    }

    /**
     * Delete user by idx
     * Soft delete
     *
     * @param {number} idx
     * @param {import('pg').PoolClient | undefined} conn
     * @returns {Promise<void>}
     */
    async deleteByUserIdx(idx, conn) {
        await conn.query(
            `UPDATE 
                user_tb 
            SET 
                deleted_at = NOW() 
            WHERE idx = $1`,
            [idx]
        );
    }
};
