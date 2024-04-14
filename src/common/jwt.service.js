const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

module.exports = class JwtService {
    /**
     * Generate json web token
     *
     * @param {object} payload
     * @param {jwt.SignOptions} signOption
     * @returns {string}
     */
    sign(payload, signOption) {
        return jwt.sign(payload, jwtConfig.secretKey, signOption);
    }

    /**
     * Verify json web token
     *
     * @param {string} token
     * @returns {any}
     */
    verify(token) {
        return jwt.verify(token, jwtConfig.secretKey);
    }
};
