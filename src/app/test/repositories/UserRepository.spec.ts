import { describe, expect, test, beforeAll, jest } from '@jest/globals';
import { User } from '../../models/User';
import { UserRepository } from '../../repositories/UserRepository';

jest.mock('../../models/User'); 

describe('Testing User repository', () => {
    beforeAll(() => {
        jest.clearAllMocks(); // Limpa os mocks antes de cada teste
    });

    describe('Create user', () => {
        it('should create a user', async () => {
            const mockUser = { id: 1, name: 'Diego', email: 'diego@teste.com', password: '123456' };
            jest.spyOn(User, 'create').mockResolvedValue(mockUser as any);

            const result = await UserRepository.createUser({
                name: 'Diego',
                email:'diego@teste.com',
                password:'123456',
            });

            expect(User.create).toHaveBeenCalledWith({
                name: 'Diego',
                email:'diego@teste.com',
                password:'123456',
            });

            expect(result).toEqual(mockUser);
        });
    });

    describe('Find user by ID', () => {
        it('should find a user by ID', async () => {
            const user = {id:2,name:'Diego'}

            jest.spyOn(User, 'findByPk').mockResolvedValue(user as any);
            const result = await UserRepository.findUserById(2);

            expect(User.findByPk).toHaveBeenCalledWith(2);
            expect(result).toEqual(user);
        });
    });

    describe('Find user by Email', () => {
        it('should find a user by email', async () => {
            const user = {id:2,name:'Diego',email:'diego@inatel.br'}

            jest.spyOn(User, 'findOne').mockResolvedValue(user as any);
            const result = await UserRepository.findUserByEmail('diego@inatel.br');

            expect(result).toEqual(user);
        });
    });

    describe('Update user', () => {
        it('should update a user', async () => {
            const mockUser = { id: 1, name: 'Diego', email: 'diego@teste.br'};

            jest.spyOn(User, 'update').mockResolvedValue([1, [mockUser]] as any);
            const result = await UserRepository.updateUser(1, {
                name: 'Diego',
                email:'diego@gmail.com',
            });
            expect(User.update).toHaveBeenCalledWith(
                {
                    name: 'Diego',
                    email:'diego@gmail.com',
                },
                { where: { id: 1 }, returning: true }
            );

            expect(result).toEqual([1, [mockUser]]);
        });
    });

    describe('Delete user', () => {
        it('should delete a user', async () => {
            const mockUser = { id: 1, name: 'Diego', email: 'diego@teste.br'};
            jest.spyOn(User, 'destroy').mockResolvedValue(1 as any);

            const result = await UserRepository.deleteUser(1);

            expect(User.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(result).toEqual(1);
        });
    }
    );

    describe('Find all users', () => {
        it('should find all users', async () => {
            const mockUser = { id: 1, name: 'Diego', email: 'diego@gmail.com'};
            const mockUser2 = { id: 2, name: 'Lucas', email: 'lucas@gmail.com'};
            const mockUser3 = { id: 3, name: 'João', email: 'joao@inatel.br'};

            jest.spyOn(User, 'findAll').mockResolvedValue([mockUser, mockUser2, mockUser3] as any);
            const result = await UserRepository.findAllUsers();
            expect(User.findAll).toHaveBeenCalledWith({ where: {} });
            expect(result).toEqual([mockUser, mockUser2, mockUser3]);
        });
    }
    );

    describe('Find all users with filter', () => {
        it('should find all users with filter', async () => {
            const mockUser = { id: 1, name: 'Diego', email: 'diego@gmail.com'};
            const mockUser2 = { id: 2, name: 'Lucas', email: 'lucas@gmail.com'};
            const mockUser3 = { id: 3, name: 'João', email: 'joao@inatel.br'};

            const filter = { name: 'Diego' };
            jest.spyOn(User, 'findAll').mockResolvedValue([mockUser, mockUser2, mockUser3] as any);
            const result = await UserRepository.findAllUsers(filter);
            expect(User.findAll).toHaveBeenCalledWith({ where: { ...filter } });
            expect(result).toEqual([mockUser]);
        });
    }
    );
});