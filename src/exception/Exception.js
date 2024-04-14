module.exports = class Exception {
    /**
     * @type {number}
     */
    status;

    /**
     * @type {string}
     */
    message;

    /**
     * @type {any}
     */
    err;

    /**
     * @param {number} status
     * @param {string} message
     * @param {any} err
     */
    constructor(status, message, err = null) {
        this.status = status;
        this.message = message;
        this.err = err;
    }
};
