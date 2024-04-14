const UnauthorizedException = require('../../../common/exception/UnauthorizedException');

module.exports = class InvalidIdOrPwException extends UnauthorizedException {
    /**
     * @param {string} message
     */
    constructor(message) {
        super(message);
    }
};
