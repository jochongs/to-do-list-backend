const User = require('../model/user.model');

module.exports = class UserEntity {
    /**
     * @type {number}
     */
    idx;

    /**
     * @type {string}
     */
    id;

    /**
     * @type {string}
     */
    nickname;

    /**
     * @type {Date}
     */
    createdAt;

    /**
     * @param {{
     *  idx: number;
     *  id: string;
     *  nickname: string;
     *  createdAt: Date;
     * }} data
     */
    constructor(data) {
        this.idx = data.idx;
        this.id = data.id;
        this.nickname = data.nickname;
        this.createdAt = data.createdAt;
    }

    /**
     * Create UserEntity with User model
     *
     * @param {User} user
     */
    static createUserEntity(user) {
        return new UserEntity({
            idx: user.idx,
            id: user.id,
            nickname: user.nickname,
            createdAt: new Date(user.createdAt),
        });
    }
};
