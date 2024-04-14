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
};
