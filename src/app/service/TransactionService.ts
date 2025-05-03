import { TransactionRepository } from '../repositories/TransactionRepository';
import { Transaction } from '../models/Transaction';

export class TransactionService {
    constructor(private transactionRepository: TransactionRepository) {}

    async createTransaction(data: Partial<Transaction>): Promise<Transaction> {
        return await this.transactionRepository.createTransaction(data);
    }

    async getTransactionById(id: number): Promise<Transaction | null> {
        return await this.transactionRepository.findTransactionById(id);
    }

    async updateTransaction(id: number, data: Partial<Transaction>): Promise<[number, Transaction[]]> {
        return await this.transactionRepository.updateTransaction(id, data);
    }

    async deleteTransaction(id: number): Promise<number> {
        return await this.transactionRepository.deleteTransaction(id);
    }

    async getAllTransactions(filter: Partial<Transaction> = {}): Promise<Transaction[]> {
        return await this.transactionRepository.findAllTransactions(filter);
    }
}