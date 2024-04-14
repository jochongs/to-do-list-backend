const BadRequestException = require('../../../common/exception/BadRequestException');

module.exports = class LoginDto {
    /**
     * @type {string}
     */
    id;

    /**
     * @type {string}
     */
    pw;

    /**
     * @param {{
     *  id: string;
     *  pw: string;
     * }} data
     */
    constructor(data) {
        this.id = data.idx;
        this.pw = data.pw;
    }

    /**
     *
     * @param {{
     *  id: string;
     *  pw: string;
     * }} data
     */
    static createLgoinDto(data) {
        if (!data.id) {
            throw new BadRequestException('Invalid id');
        }

        if (!data.pw) {
            throw new BadRequestException('Invalid pw');
        }

        return new LoginDto({
            id: data.id,
            pw: data.pw,
        });
    }
};
