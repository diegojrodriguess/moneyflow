import { describe, expect, beforeAll, jest, it } from '@jest/globals';
import { Transaction } from '../../models/Transaction';
import { TransactionRepository } from '../../repositories/TransactionRepository';
import { TransactionService } from '../../service/TransactionService';

jest.mock('../../repositories/TransactionRepository'); // Mock the repository

describe('Testing Transaction service', () => {
    beforeAll(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    describe('Create transaction', () => {
        it('should create a transaction successfully', async () => {
            const mockTransaction = { id: 1, amount: 100, type: 'INCOME', description: 'Salary'} as Transaction;
            jest.spyOn(TransactionRepository, 'createTransaction').mockResolvedValue(mockTransaction);

            const result = await TransactionService.createTransaction({
                amount: 100,
                type: 'INCOME',
                description: 'Salary'
            });

            expect(result).toEqual(mockTransaction);
        });

        it('should throw an error if transaction creation fails', async () => {
            jest.spyOn(TransactionRepository, 'createTransaction').mockRejectedValue(new Error('Creation failed'));

            await expect(TransactionService.createTransaction({})).rejects.toThrow('Creation failed');
        });
    });

    describe('Get transaction by ID', () => {
        it('should return a transaction by ID', async () => {
            const mockTransaction = { id: 1, amount: 100, type: 'INCOME', description: 'Salary'} as Transaction;
            jest.spyOn(TransactionRepository, 'findTransactionById').mockResolvedValue(mockTransaction);

            const result = await TransactionService.getTransactionById(1);

            expect(result).toEqual(mockTransaction);
        });

        it('should return null if transaction not found', async () => {
            jest.spyOn(TransactionRepository, 'findTransactionById').mockResolvedValue(null);

            const result = await TransactionService.getTransactionById(999);

            expect(result).toBeNull();
        });
    });

    describe('Update transaction', () => {
        it('should update a transaction successfully', async () => {
            const mockTransaction = { id: 1, amount: 100, type: 'INCOME', description: 'Salary'} as Transaction;
            jest.spyOn(TransactionRepository, 'updateTransaction').mockResolvedValue([1, [mockTransaction]]);

            const result = await TransactionService.updateTransaction(1, { amount: 200 });

            expect(result).toEqual([1, [mockTransaction]]);
        });

        it('should throw an error if transaction update fails', async () => {
            jest.spyOn(TransactionRepository, 'updateTransaction').mockRejectedValue(new Error('Update failed'));

            await expect(TransactionService.updateTransaction(1, {})).rejects.toThrow('Update failed');
        });
    });

    describe('Delete transaction', () => {
        it('should delete a transaction successfully', async () => {
            jest.spyOn(TransactionRepository, 'deleteTransaction').mockResolvedValue(1);

            const result = await TransactionService.deleteTransaction(1);

            expect(result).toEqual(1);
        });

        it('should throw an error if transaction deletion fails', async () => {
            jest.spyOn(TransactionRepository, 'deleteTransaction').mockRejectedValue(new Error('Deletion failed'));

            await expect(TransactionService.deleteTransaction(1)).rejects.toThrow('Deletion failed');
        });
    });

    describe('Get all transactions', () => {
        it('should return all transactions', async () => {
            const mockTransactions = [
                { id: 1, amount: 100, type: 'INCOME', description: 'Salary'} as Transaction,
                { id: 2, amount: 50, type: 'EXPENSE', description: 'Groceries'} as Transaction
            ];
            jest.spyOn(TransactionRepository, 'findAllTransactions').mockResolvedValue(mockTransactions);

            const result = await TransactionService.getAllTransactions();

            expect(result).toEqual(mockTransactions);
        });

        it('should return filtered transactions', async () => {
            const mockTransactions = [
                { id: 1, amount: 100, type: 'INCOME', description: 'Salary'} as Transaction
            ];
            jest.spyOn(TransactionRepository, 'findAllTransactions').mockResolvedValue(mockTransactions);

            const result = await TransactionService.getAllTransactions({ type: 'INCOME' });

            expect(result).toEqual(mockTransactions);
        });
    });


});