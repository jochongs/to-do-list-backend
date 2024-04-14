const Exception = require('./Exception');

module.exports = class ForbiddenException extends Exception {
    /**
     * @param {string} message
     * @param {any} err
     */
    constructor(message, err) {
        super(403, message, err);
    }
};
