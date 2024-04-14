const bcrypt = require('bcrypt');

module.exports = class HashService {
    /**
     * Hash string
     *
     * @param {string} str
     * @returns {string}
     */
    hash(str) {
        return bcrypt.genSaltSync(str, 10);
    }

    /**
     * Compare str with hashed str
     *
     * @param {string} str
     * @param {string} hashedStr
     * @returns {boolean}
     */
    compare(str, hashedStr) {
        return bcrypt.compareSync(str, hashedStr);
    }
};
