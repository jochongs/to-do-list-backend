const UnauthorizedException = require('../../../common/exception/UnauthorizedException');

module.exports = class InvalidLoginTokenException extends UnauthorizedException {
    /**
     * @param {string} message
     */
    constructor(message) {
        super(message);
    }
};
