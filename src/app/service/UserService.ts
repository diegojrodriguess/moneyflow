import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';

export class UserService {
    constructor(private userRepository: UserRepository) {}

    static async createUser(data: Partial<User>): Promise<User> {
        return await UserRepository.createUser(data);
    }

    static async getUserById(id: number): Promise<User | null> {
        return await UserRepository.findUserById(id);
    }

    static async getUserByEmail(email: string): Promise<User | null> {
        return await UserRepository.findUserByEmail(email);
    }

    static async updateUser(id: number, data: Partial<User>): Promise<[number, User[]]> {
        return await UserRepository.updateUser(id, data);
    }

    static async deleteUser(id: number): Promise<number> {
        return await UserRepository.deleteUser(id);
    }

    static async getAllUsers(filter: Partial<User> = {}): Promise<User[]> {
        return await UserRepository.findAllUsers(filter);
    }
}