import { TransactionRepository } from '../repositories/TransactionRepository';
import { Transaction } from '../models/Transaction';

export class TransactionService {
    constructor(private transactionRepository: TransactionRepository) {}

    static async createTransaction(data: Partial<Transaction>): Promise<Transaction> {
        return await TransactionRepository.createTransaction(data);
    }

    static async getTransactionById(id: number): Promise<Transaction | null> {
        return await TransactionRepository.findTransactionById(id);
    }

    static async updateTransaction(id: number, data: Partial<Transaction>): Promise<[number, Transaction[]]> {
        return await TransactionRepository.updateTransaction(id, data);
    }

    static async deleteTransaction(id: number): Promise<number> {
        return await TransactionRepository.deleteTransaction(id);
    }

    static async getAllTransactions(filter: Partial<Transaction> = {}): Promise<Transaction[]> {
        return await TransactionRepository.findAllTransactions(filter);
    }
}