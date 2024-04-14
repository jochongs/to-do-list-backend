const AuthService = require('../auth/auth.service');
const LoginUserEntity = require('../auth/entity/LoginUserEntity');
const SignUpDto = require('./dto/sign-up.dto');
const UpdateUserDto = require('./dto/update-user.dto');
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

    async getMyInfo(req, res) {
        const loginUser = LoginUserEntity.createLoginUserEntity(req.user);

        const userEntity = await this.userService.getUserByIdx(loginUser);

        res.status(200).send({
            user: userEntity,
        });
    }

    async updateMyInfo(req, res) {
        const loginUser = LoginUserEntity.createLoginUserEntity(req.user);
        const updateDto = UpdateUserDto.createUpdateDto(req.body);

        await this.userService.updateUserByIdx(loginUser.idx, updateDto);

        res.status(201).end();
    }

    async withdrawal(req, res) {
        const loginUser = LoginUserEntity.createLoginUserEntity(req.user);

        await this.userService.deleteUserByIdx(loginUser.idx);

        res.status(201).end();
    }
};
