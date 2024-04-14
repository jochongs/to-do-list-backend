const { Pool } = require('pg');
const UserRepository = require('../../src/api/user/user.repository');
const UserService = require('../../src/api/user/user.service');
const HashService = require('../../src/common/hash.service');
const DuplicateIdException = require('../../src/api/user/exception/DuplicateIdException');

describe('UserService', () => {
    /**
     * @type {UserService}
     */
    let userService;

    /**
     * @type {UserRepository}
     */
    let userRepository;

    /**
     * @type {HashService}
     */
    let hashService;

    /**
     * @type {import('pg').Pool}
     */
    let pgPool;

    beforeEach(() => {
        userRepository = new UserRepository();
        hashService = new HashService();
        pgPool = {
            connect: () => {},
            release: () => {},
        };

        userService = new UserService(userRepository, hashService, pgPool);
    });

    it('signUp success', async () => {
        // 1. Get connection from pgPool
        jest.spyOn(pgPool, 'connect').mockResolvedValue(pgPool);

        // 2. Select user by id
        jest.spyOn(userRepository, 'selectById').mockResolvedValue(null);

        // 3. Hash password
        jest.spyOn(hashService, 'hash').mockResolvedValue('hashedPassword');

        // 4. Insert user
        jest.spyOn(userRepository, 'insert').mockResolvedValue(undefined);

        await expect(
            userService.signUp({
                id: 'abc123',
                nickname: 'test',
                pw: 'password12!@',
            })
        ).resolves.toBeUndefined();
    });

    it('signUp fail - duplicate user', async () => {
        jest.spyOn(pgPool, 'connect').mockResolvedValue(pgPool);

        // Find ID duplicate user
        jest.spyOn(userRepository, 'selectById').mockResolvedValue({
            idx: 1,
            id: 'abc123',
            pw: 'hashedPassword',
            nickname: 'test',
            createdAt: new Date(),
            deletedAt: null,
        });

        await expect(
            userService.signUp({
                id: 'abc123',
                nickname: 'test',
                pw: 'password12!@',
            })
        ).rejects.toThrow(DuplicateIdException);
    });
});
