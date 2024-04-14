const SignUpDto = require('./dto/sign-up.dto');
const UserRepository = require('./user.repository');

module.exports = class UserService {
    userRepository;

    /**
     * @param {UserRepository} userRepository
     */
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
};
