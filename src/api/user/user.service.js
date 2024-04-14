const pgPool = require('../../common/database/pgPool');
const HashService = require('../../common/hash.service');
const SignUpDto = require('./dto/sign-up.dto');
const UpdateUserDto = require('./dto/update-user.dto');
const UserEntity = require('./entity/user.entity');
const DuplicateIdException = require('./exception/DuplicateIdException');
const UserNotFoundException = require('./exception/UserNotFoundException');
const UserRepository = require('./user.repository');

module.exports = class UserService {
    userRepository;
    hashService;
    pgPool;

    /**
     * @param {UserRepository} userRepository
     * @param {HashService} hashService
     * @param {import('pg').Pool} pgPool
     */
    constructor(userRepository, hashService, pgPool) {
        this.userRepository = userRepository;
        this.hashService = hashService;
        this.pgPool = pgPool;
    }

    /**
     * Sign Up
     *
     * @param {SignUpDto} signUpDto
     * @returns {Promise<void>}
     *
     * @throws {DuplicateIdException}
     */
    async signUp(signUpDto) {
        const conn = await pgPool.connect();
        try {
            const idDuplicateUser = await this.userRepository.selectById(signUpDto.id, conn);

            if (idDuplicateUser) {
                throw new DuplicateIdException('Duplicated Id');
            }

            await this.userRepository.insert({
                id: signUpDto.id,
                nickname: signUpDto.nickname,
                pw: this.hashService.hash(signUpDto.pw),
            });
        } catch (err) {
            throw err;
        } finally {
            conn.release();
        }
    }

    /**
     * Get user by idx
     *
     * @param {number} idx
     * @returns {Promise<UserEntity>}
     *
     * @throws {UserNotFoundException}
     */
    async getUserByIdx(idx) {
        const user = await this.userRepository.selectByIdx(idx);

        if (!user) {
            throw new UserNotFoundException('Cannot find user');
        }

        return UserEntity.createUserEntity(user);
    }

    /**
     * Update user nickname
     *
     * @param {number} idx
     * @param {UpdateUserDto} updateDto
     * @returns {Promise<void>}
     */
    async updateUserByIdx(idx, updateDto) {
        await this.userRepository.updateByIdx(idx, {
            nickname: updateDto.nickname,
        });
    }

    /**
     * Delete user by idx
     *
     * @param {number} idx
     * @returns {Promise<void>}
     */
    async deleteUserByIdx(idx) {
        await this.userRepository.deleteByIdx(idx);
    }
};
