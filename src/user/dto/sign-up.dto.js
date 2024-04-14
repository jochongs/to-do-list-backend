const { BadRequestException } = require('../../exception/BadRequestException');

module.exports = class SignUpDto {
    /**
     * @type {string}
     */
    id;

    /**
     * @type {string}
     */
    pw;

    /**
     * @type {string}
     */
    nickname;

    /**
     * @param {{
     *  id: string;
     *  pw: string;
     *  nickname: string
     * }} data
     */
    constructor(data) {
        this.id = data.id;
        this.pw = data.pw;
        this.nickname = data.nickname;
    }

    /**
     * @param {{
     *  id: string;
     *  pw: string;
     *  nickname: string;
     * }} data
     */
    static createSignUpDto(data) {
        if (!data.id) {
            throw new BadRequestException('Invalid id');
        }

        if (!data.pw) {
            throw new BadRequestException('Invalid pw');
        }

        if (!data.nickname) {
            throw new BadRequestException('Invalid nickname');
        }

        return new SignUpDto({
            id: data.id,
            pw: data.pw,
            nickname: data.nickname,
        });
    }
};
