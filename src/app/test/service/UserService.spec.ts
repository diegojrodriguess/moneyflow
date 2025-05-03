import { describe, expect, beforeAll, jest, it } from '@jest/globals';
import { User } from '../../models/User';
import { UserRepository } from '../../repositories/UserRepository';
import { UserService } from '../../service/UserService';

const userRepository = require('../../repositories/UserRepository');

jest.mock('../../repositories/UserRepository', () => {
    return {
        UserRepository: jest.fn().mockImplementation(() => {
            return {
                createUser: jest.fn(),
                findUserById: jest.fn(),
                findUserByEmail: jest.fn(),
                updateUser: jest.fn(),
                deleteUser: jest.fn(),
                findAllUsers: jest.fn(),
            };
        }),
    };
});
describe('UserService', () => {
    let userService: UserService;
    let userRepositoryMock: jest.Mocked<UserRepository>;

    beforeAll(() => {
        userRepositoryMock = new userRepository.UserRepository() as jest.Mocked<UserRepository>;
        userService = new UserService(userRepositoryMock);
    });

    it('should create a user', async () => {
        const userData = { name: 'Diego', email: 'diego@gmail.com', password:'123456' } as User;

        userRepositoryMock.createUser.mockResolvedValue(userData);
        const result = await userService.createUser(userData);

        expect(userRepositoryMock.createUser).toHaveBeenCalledWith(userData);
        expect(result).toEqual(userData);
    });

    it('should get a user by ID', async () => {
        const userId = 1;
        const userData = { id: userId, name: 'Diego', email: 'diego@gmail.com', password:'123456' } as User;

        userRepositoryMock.findUserById.mockResolvedValue(userData);
        const result = await userService.getUserById(userId);

        expect(result).toEqual(userData);
        expect(userRepositoryMock.findUserById).toHaveBeenCalledWith(userId);
    });

    it('should get a user by email', async () => {
        const userEmail = 'diego@gmail.com';
        const userData = { id: 1, name: 'Diego', email: userEmail, password:'123456' } as User;

        userRepositoryMock.findUserByEmail.mockResolvedValue(userData);
        const result = await userService.getUserByEmail(userEmail);

        expect(result).toEqual(userData);
        expect(userRepositoryMock.findUserByEmail).toHaveBeenCalledWith(userEmail);
    });

    it('should update a user', async () => {
        const userId = 1;
        const userData = { id: userId, name: 'Diego', email: 'diego@gmail.com', password:'123456' } as User;

        const updatedData = { name: 'Diego Updated' };

        userRepositoryMock.updateUser.mockResolvedValue([1, [userData]]);
        const result = await userService.updateUser(userId, updatedData);

        expect(result).toEqual([1, [userData]]);
        expect(userRepositoryMock.updateUser).toHaveBeenCalledWith(userId, updatedData);
    });

    it('should delete a user', async () => {
        const userId = 1;

        userRepositoryMock.deleteUser.mockResolvedValue(1);
        const result = await userService.deleteUser(userId);

        expect(result).toEqual(1);
        expect(userRepositoryMock.deleteUser).toHaveBeenCalledWith(userId);
    });

    it('should get all users', async () => {
        const userData = [
            { id: 1, name: 'Diego', email: 'diego@gmail.com', password:'123456' },
            { id: 2, name: 'John', email: 'john@gmail.com', password:'123456' },
        ] as User[];

        userRepositoryMock.findAllUsers.mockResolvedValue(userData);
        const result = await userService.getAllUsers();

        expect(result).toEqual(userData);
        expect(userRepositoryMock.findAllUsers).toHaveBeenCalledWith({});
    });
});


