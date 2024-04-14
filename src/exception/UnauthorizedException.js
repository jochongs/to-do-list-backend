const Exception = require('./Exception');

module.exports = class UnauthorizedException extends Exception {
    /**
     * @param {string} message
     * @param {any} err
     */
    constructor(message, err) {
        super(401, message, err);
    }
};
