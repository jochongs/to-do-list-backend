const UnauthorizedException = require('../../../exception/UnauthorizedException');

module.exports = class InvalidIdOrPwException extends UnauthorizedException {
    /**
     * @param {string} message
     */
    constructor(message) {
        super(message);
    }
};
