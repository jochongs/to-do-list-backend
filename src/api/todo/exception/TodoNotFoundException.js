const NotFoundException = require('../../../common/exception/NotFoundException');

module.exports = class TodoNotFoundException extends NotFoundException {
    /**
     * @param {string} message
     */
    constructor(message) {
        super(message);
    }
};
