const { jwtService } = require('./index.service');
const AuthMiddleware = require('./auth/auth.middleware');

const authMiddleware = new AuthMiddleware(jwtService);

module.exports = {
    authMiddleware,
};
