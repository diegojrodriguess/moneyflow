import { Request, Response } from 'express';
import { UserService } from '../service/UserService';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';

export class UserController {
    constructor(private userService: UserService) {}

    async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const userData: Partial<User> = req.body;
            const newUser = await this.userService.createUser(userData);
            return res.status(201).json(newUser);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to create user' });
        }
    }

    async getUserById(req: Request, res: Response): Promise<Response> {
        try {
            const userId = parseInt(req.params.id);
            const user = await this.userService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve user' });
        }
    }

    async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = parseInt(req.params.id);
            const userData: Partial<User> = req.body;
            const updatedUser = await this.userService.updateUser(userId, userData);
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to update user' });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = parseInt(req.params.id);
            const deletedUser = await this.userService.deleteUser(userId);
            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete user' });
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<Response> {
        try {
            const filter: Partial<User> = req.query;
            const users = await this.userService.getAllUsers(filter);
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve users' });
        }
    }

    async getUserByEmail(req: Request, res: Response): Promise<Response> {
        try {
            const email = req.params.email;
            const user = await this.userService.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve user' });
        }
    }
}