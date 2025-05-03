import { describe, expect, beforeAll, jest, it } from '@jest/globals';
import { User } from '../../models/User';
import { UserRepository } from '../../repositories/UserRepository';
import { UserService } from '../../service/UserService';

jest.mock('../../repositories/UserRepository'); // Mock the repository

describe('Testing User service', () => {
    beforeAll(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    describe('Create user', () => {
        it('should create a user successfully', async () => {
            const mockUser: Partial<User> = { name: 'Diego', email: 'diego@teste.com', password: '123456' };
            jest.spyOn(UserRepository, 'createUser').mockResolvedValue(mockUser as User);

            const result = await UserService.createUser({
                name: 'Diego',
                email: 'diego@teste.com',
                password: '123456',
            });

            // Assert: Verify the repository was called and the result is correct
            expect(UserRepository.createUser).toHaveBeenCalledWith({
                name: 'Diego',
                email: 'diego@teste.com',
                password: '123456',
            });
            expect(result).toEqual(mockUser);
        });

        it('should throw an error if user creation fails', async () => {
            jest.spyOn(UserRepository, 'createUser').mockRejectedValue(new Error('Creation failed'));

            await expect(UserService.createUser({})).rejects.toThrow('Creation failed');
        });
    });
});


