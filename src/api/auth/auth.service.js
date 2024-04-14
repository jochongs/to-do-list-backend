const HashService = require('../../common/hash.service');
const JwtService = require('../../common/jwt.service');
const UserRepository = require('../user/user.repository');
const UserService = require('../user/user.service');
const LoginDto = require('./dto/login.dto');
const InvalidIdOrPwException = require('./exception/InvalidIdOrPwException');

module.exports = class AuthService {
    userRepository;
    userService;
    jwtService;
    hashService;

    /**
     * @param {UserRepository} userRepository
     * @param {JwtService} jwtService
     * @param {UserService} userService
     * @param {HashService} hashService
     */
    constructor(userRepository, jwtService, userService, hashService) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.hashService = hashService;
        this.jwtService = jwtService;
    }

    /**
     * @param {LoginDto} loginDto
     *
     * @returns {Promise<{ jwt: string }>}
     */
    async login(loginDto) {
        const user = await this.userRepository.selectById(loginDto.id);

        if (!user) {
            throw new InvalidIdOrPwException('Invalid id');
        }

        if (!this.hashService.compare(loginDto.pw, user.pw)) {
            throw new InvalidIdOrPwException('Invalid pw');
        }

        const token = this.jwtService.sign(
            {
                idx: user.idx,
            },
            {
                expiresIn: '14d',
            }
        );

        return {
            jwt: token,
        };
    }
};
