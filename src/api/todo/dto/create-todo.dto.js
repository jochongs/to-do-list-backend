const { BadRequestException } = require('../../../exception/BadRequestException');

module.exports = class CreateTodoDto {
    title;
    contents;

    /**
     * @param {{
     *  title: string;
     *  contents: string;
     * }} data
     */
    constructor(data) {
        this.title = data.title;
        this.contents = data.contents;
    }

    /**
     * @param {{
     *  title: string;
     *  contents: string;
     * }} data
     */
    static createTodoDto(data) {
        if (!data.title) {
            throw new BadRequestException('Invalid title');
        }
        if (!data.contents) {
            throw new BadRequestException('Invalid contents');
        }
        return new CreateTodoDto({
            title: data.contents,
            contents: data.contents,
        });
    }
};
