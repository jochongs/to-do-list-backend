const AuthService = require('./auth.service');
const LoginDto = require('./dto/login.dto');

module.exports = class AuthController {
    authService;

    /**
     * @param {AuthService} authService
     */
    constructor(authService) {
        this.authService = authService;
    }

    async login(req, res) {
        const loginDto = LoginDto.createLgoinDto(req.body);

        const { jwt } = await this.authService.login(loginDto);

        res.status(200).send({
            token: jwt,
        });
    }
};
