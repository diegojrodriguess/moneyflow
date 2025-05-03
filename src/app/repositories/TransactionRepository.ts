import { Transaction } from '../models/Transaction';

export class TransactionRepository {
    async createTransaction(data: Partial<Transaction>): Promise<Transaction> {
        return await Transaction.create(data);
    }

    async findTransactionById(id: number): Promise<Transaction | null> {
        return await Transaction.findByPk(id);
    }

    async updateTransaction(id: number, data: Partial<Transaction>): Promise<[number, Transaction[]]> {
        return await Transaction.update(data, { where: { id }, returning: true });
    }

    async deleteTransaction(id: number): Promise<number> {
        return await Transaction.destroy({ where: { id } });
    }

    async findAllTransactions(filter: Partial<Transaction> = {}): Promise<Transaction[]> {
        return await Transaction.findAll({ where: { ...filter } });
    }
}