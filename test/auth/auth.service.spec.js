const AuthService = require('../../src/api/auth/auth.service');
const InvalidIdOrPwException = require('../../src/api/auth/exception/InvalidIdOrPwException');
const UserRepository = require('../../src/api/user/user.repository');
const UserService = require('../../src/api/user/user.service');
const HashService = require('../../src/common/hash.service');
const JwtService = require('../../src/common/jwt.service');

describe('AuthService', () => {
    /**
     * @type {AuthService}
     */
    let authService;

    /**
     * @type {UserRepository}
     */
    let userRepository;

    /**
     * @type {JwtService}
     */
    let jwtService;

    /**
     * @type {UserService}
     */
    let userService;

    /**
     * @type {HashService}
     */
    let hashService;

    beforeEach(() => {
        userRepository = new UserRepository();
        jwtService = new JwtService();
        userService = new UserService();
        hashService = new HashService();

        authService = new AuthService(userRepository, jwtService, userService, hashService);
    });

    it('login success', async () => {
        // 1. Select user by ID
        const inputId = 'abc123';
        const inputPw = 'password123@!';
        jest.spyOn(userRepository, 'selectById').mockResolvedValue({
            idx: 1,
            id: inputId,
            pw: 'hashedpassword',
            nickname: 'test',
            createdAt: new Date(),
            deletedAt: null,
        });

        // 2. Compare password
        jest.spyOn(hashService, 'compare').mockReturnValue(true);

        // 3. Create json web token
        const jwt = 'this.is.token';
        jest.spyOn(jwtService, 'sign').mockReturnValue(jwt);

        await expect(
            authService.login({
                id: 'abc123',
                pw: inputPw,
            })
        ).resolves.toStrictEqual({
            jwt,
        });
        expect(userRepository.selectById).toHaveBeenCalledTimes(1);
        expect(userRepository.selectById).toHaveBeenCalledWith(inputId);
        expect(hashService.compare).toHaveBeenCalledTimes(1);
        expect(jwtService.sign).toHaveBeenCalledTimes(1);
    });

    it('login fail - user not found', async () => {
        // User not found
        jest.spyOn(userRepository, 'selectById').mockResolvedValue(null);

        await expect(
            authService.login({
                id: 'abc123',
                pw: 'password123@!',
            })
        ).rejects.toThrow(InvalidIdOrPwException);
    });

    it('lgoin fail - invalid password', async () => {
        jest.spyOn(userRepository, 'selectById').mockResolvedValue({
            idx: 1,
            id: 'abc123',
            pw: 'hashedpassword',
            nickname: 'test',
            createdAt: new Date(),
            deletedAt: null,
        });

        jest.spyOn(hashService, 'compare').mockReturnValue(false);

        await expect(
            authService.login({
                id: 'abc123',
                pw: 'password123@!',
            })
        ).rejects.toThrow(InvalidIdOrPwException);
    });
});
