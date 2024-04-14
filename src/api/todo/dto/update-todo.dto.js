module.exports = class UpdateTodoDto {
    /**
     * @type {string}
     */
    title;

    /**
     * @type {string}
     */
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
    static createUpdateTodoDto(data) {
        return new UpdateTodoDto({
            title: data.title,
            contents: data.contents,
        });
    }
};
