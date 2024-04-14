const NotFoundException = require('../../../exception/NotFoundException');

module.exports = class UserNotFoundException extends NotFoundException {
    /**
     * @param {string} message
     */
    constructor(message) {
        super(message);
    }
};
