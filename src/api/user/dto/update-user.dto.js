const BadRequestException = require('../../../common/exception/BadRequestException');

module.exports = class UpdateUserDto {
    /**
     * @type {string}
     */
    nickname;

    /**
     * @param {{
     *  nickname: string
     * }} data
     */
    constructor(data) {
        this.nickname = data.nickname;
    }

    /**
     * @param {{
     *  nickname: string
     * }} data
     */
    static createUpdateDto(data) {
        if (!nickname) {
            throw new BadRequestException('Invalid nickname');
        }

        return new UpdateUserDto({
            nickname: data.nickname,
        });
    }
};
