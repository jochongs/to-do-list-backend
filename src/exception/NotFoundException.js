const Exception = require('./Exception');

module.exports = class NotFoundException extends Exception {
    /**
     * @param {string} message
     * @param {any} err
     */
    constructor(message, err) {
        super(404, message, err);
    }
};
