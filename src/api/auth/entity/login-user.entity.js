const TokenPayloadDto = require('../dto/token-payload.dto');

module.exports = class LoginUserEntity {
    /**
     * @type
     */
    idx;

    /**
     * @param {{
     *  idx: number;
     * }} data
     */
    constructor(data) {
        this.idx = data.idx;
    }

    /**
     * @param {TokenPayloadDto} payload
     */
    static createLoginUserEntity(payload) {
        return new LoginUserEntity(payload.idx);
    }
};
