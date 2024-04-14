const ConflictException = require('../../../common/exception/ConflictException');

module.exports = class DuplicateIdException extends ConflictException {
    /**
     * @param {string} message
     */
    constructor(message) {
        super(message);
    }
};
