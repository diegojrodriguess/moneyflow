import { User } from '../models/User'; 

export class UserRepository {
    async createUser(data: Partial<User>): Promise<User> {
        return await User.create(data);
    }

    async findUserById(id: number): Promise<User | null> {
        return await User.findByPk(id);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return await User.findOne({ where: { email } });
    }

    async updateUser(id: number, data: Partial<User>): Promise<[number, User[]]> {
        return await User.update(data, { where: { id }, returning: true });
    }

    async deleteUser(id: number): Promise<number> {
        return await User.destroy({ where: { id } });
    }

    async findAllUsers(filter: Partial<User> = {}): Promise<User[]> {
        return await User.findAll({ where: { ...filter } });
    }
}
