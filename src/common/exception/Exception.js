module.exports = class Exception extends Error {
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
        super(err);
        this.status = status;
        this.message = message;
        this.err = err;
    }
};
