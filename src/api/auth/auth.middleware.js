const JwtService = require('../../common/jwt.service');
const InvalidLoginTokenException = require('./exception/InvalidLoginTokenException');

module.exports = class AuthMiddleware {
    jwtService;

    /**
     * @param {JwtService} jwtService
     */
    constructor(jwtService) {
        this.jwtService = jwtService;
    }

    /**
     * Check jwt in authorization header
     *
     * @returns {import('express').RequestHandler}
     */
    async isLogin() {
        return async (req, res, next) => {
            const [tokenType, token] = req.headers.authorization?.split(' ') || [];

            if (tokenType !== 'Bearer' || !token) {
                throw new InvalidLoginTokenException('No token');
            }

            try {
                const payload = await this.jwtService.verify(token);

                req.user = payload;

                next();
            } catch (err) {
                throw new InvalidLoginTokenException('Invalid login token');
            }
        };
    }
};
