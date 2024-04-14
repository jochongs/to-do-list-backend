const Exception = require('./Exception');

module.exports = class InternalServerErrorException extends Exception {
    /**
     * @param {string} message
     * @param {any} err
     */
    constructor(message, err) {
        super(500, message, err);
    }
};
