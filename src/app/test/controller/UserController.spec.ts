import { describe, expect, beforeAll, jest, it } from '@jest/globals';
import { User } from '../../models/User';
import { UserService } from '../../service/UserService';
import { UserController } from '../../controller/UserController';
import { Request, Response } from 'express';

const userService = require('../../service/UserService');
jest.mock('../../service/UserService', () => {
    return {
        UserService: jest.fn().mockImplementation(() => {
            return {
                createUser: jest.fn(),
                getUserById: jest.fn(),
                getUserByEmail: jest.fn(),
                updateUser: jest.fn(),
                deleteUser: jest.fn(),
                getAllUsers: jest.fn(),
            };
        }),
    };
}
);
describe('UserController', () => {
    let userController: UserController;
    let userServiceMock: jest.Mocked<UserService>;

    beforeAll(() => {
        userServiceMock = new userService.UserService() as jest.Mocked<UserService>;
        userController = new UserController(userServiceMock);
    });

    it('should create a user', async () => {
        const req = { body: { name: 'Diego', email: 'diego@gmail.com', password:'123456' } } as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
            sendStatus: jest.fn(),
            end: jest.fn(),
        } as unknown as Response;
        const userData = { id: 1, name: 'Diego', email: 'diego@gmail.com', password:'123456' } as User;

        userServiceMock.createUser.mockResolvedValue(userData);
        await userController.createUser(req, res);
        expect(userServiceMock.createUser).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(userData);

    });

    it('should get a user by ID', async () => {
        const req = { params: { id: '1' } } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
            sendStatus: jest.fn(),
            end: jest.fn(),
        } as unknown as Response;

        const userData = { id: 1, name: 'Diego', email: 'diego@gmail.com', password:'123456' } as User;

        userServiceMock.getUserById.mockResolvedValue(userData);
        await userController.getUserById(req, res);

        expect(userServiceMock.getUserById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(userData);
    });

    it('should update a user', async () => {
        const req = { params: { id: '1' }, body: { name: 'Diego Updated' } } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
            sendStatus: jest.fn(),
            end: jest.fn(),
        } as unknown as Response;

        const userData = { id: 1, name: 'Diego Updated', email: 'diego@gmail.com', password:'123456' } as User;
        userServiceMock.updateUser.mockResolvedValue([1, [userData]]);
        await userController.updateUser(req, res);
        expect(userServiceMock.updateUser).toHaveBeenCalledWith(1, req.body);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should delete a user', async () => {
        const req = { params: { id: '1' } } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
            sendStatus: jest.fn(),
            end: jest.fn(),
        } as unknown as Response;

        userServiceMock.deleteUser.mockResolvedValue(1);
        await userController.deleteUser(req, res);
        expect(userServiceMock.deleteUser).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(204);
    });

    it('should get all users', async () => {
        const req = {} as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
            sendStatus: jest.fn(),
            end: jest.fn(),
        } as unknown as Response;

        const userData = [
            { id: 1, name: 'Diego', email: 'diego@gmail.com', password:'123456' },
            { id: 2, name: 'John', email: 'john@gmail.com', password: '123456' },
            { id: 3, name: 'Jane', email: 'jane@gmail.com', password: '123456' },
        ] as User[];

        userServiceMock.getAllUsers.mockResolvedValue(userData);
        await userController.getAllUsers(req, res);
        expect(userServiceMock.getAllUsers).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(userData);
    });
});