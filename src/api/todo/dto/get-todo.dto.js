module.exports = class GetTodoDto {
    /**
     * @type {number}
     */
    page;

    /**
     * @type {number | undefined}
     */
    user;

    /**
     * @param {{
     *  page: number;
     *  user: number;
     * }} data
     */
    constructor(data) {
        this.page = data.page;
        this.user = data.user;
    }

    /**
     * @param {{
     *  page: string | undefined;
     *  user: number;
     * }} data
     */
    static createGetTodoDto(data) {
        return new GetTodoDto({
            page: data.page ? Number(data.page) : 1,
            user: data.user ? Number(data.user) : undefined,
        });
    }
};
