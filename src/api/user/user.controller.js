const AuthService = require('../auth/auth.service');
const SignUpDto = require('./dto/sign-up.dto');
const UserService = require('./user.service');

module.exports = class UserController {
    userService;

    /**
     * @param {UserService} userService
     */
    constructor(userService) {
        this.userService = userService;
    }

    async signUp(req, res) {
        const signUpDto = SignUpDto.createSignUpDto(req.body);

        await this.userService.signUp(signUpDto);

        res.status(201).end();
    }
};
