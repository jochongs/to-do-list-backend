const Exception = require('./Exception');

module.exports = class ConflictException extends Exception {
    /**
     * @param {string} message
     * @param {any} err
     */
    constructor(message, err) {
        super(409, message, err);
    }
};
