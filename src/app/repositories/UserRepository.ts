import { User } from '../models/User'; 

export class UserRepository {
    static async createUser(data: Partial<User>): Promise<User> {
        return await User.create(data);
    }

    static async findUserById(id: number): Promise<User | null> {
        return await User.findByPk(id);
    }

    static async findUserByEmail(email: string): Promise<User | null> {
        return await User.findOne({ where: { email } });
    }

    static async updateUser(id: number, data: Partial<User>): Promise<[number, User[]]> {
        return await User.update(data, { where: { id }, returning: true });
    }

    static async deleteUser(id: number): Promise<number> {
        return await User.destroy({ where: { id } });
    }

    static async findAllUsers(filter: Partial<User> = {}): Promise<User[]> {
        return await User.findAll({ where: { ...filter } });
    }
}
