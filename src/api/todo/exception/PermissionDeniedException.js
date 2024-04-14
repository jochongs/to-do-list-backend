const ForbiddenException = require('../../../exception/ForbiddenException');

module.exports = class PermissionDeniedException extends ForbiddenException {
    /**
     * @param {string} message
     */
    constructor(message) {
        super(message);
    }
};
