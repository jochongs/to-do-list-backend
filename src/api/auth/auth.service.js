const UserRepository = require('../user/user.repository');
const LoginDto = require('./dto/login.dto');

module.exports = class AuthService {
    userRepository;

    /**
     * @param {UserRepository} userRepository
     */
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * @param {LoginDto} loginDto
     *
     * @returns {Promise<{ jwt: string }>}
     */
    async login(loginDto) {
        const user = await this.userRepository.selectUserById(loginDto.id);
    }
};
