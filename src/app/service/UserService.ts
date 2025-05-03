import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';

export class UserService {
    constructor(private userRepository: UserRepository) {}

    async createUser(data: Partial<User>): Promise<User> {
        return await this.userRepository.createUser(data);
    }

    async getUserById(id: number): Promise<User | null> {
        return await this.userRepository.findUserById(id);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findUserByEmail(email);
    }

    async updateUser(id: number, data: Partial<User>): Promise<[number, User[]]> {
        return await this.userRepository.updateUser(id, data);
    }

    async deleteUser(id: number): Promise<number> {
        return await this.userRepository.deleteUser(id);
    }

    async getAllUsers(filter: Partial<User> = {}): Promise<User[]> {
        return await this.userRepository.findAllUsers(filter);
    }
}