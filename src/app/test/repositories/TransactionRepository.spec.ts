import { describe, expect, test, beforeAll, jest } from '@jest/globals';
import { Transaction } from '../../models/Transaction';
import { TransactionRepository } from '../../repositories/TransactionRepository';

jest.mock('../../models/Transaction');

describe('Testing Transaction repository', () => {
    beforeAll(() => {
        jest.clearAllMocks(); // Limpa os mocks antes de cada teste
    });

    describe('Create transaction', () => {
        it('should create a transaction', async () => {
            const mockTransaction = { id: 1, amount: 100, type: 'INCOME', description: 'Salary'};
            jest.spyOn(Transaction, 'create').mockResolvedValue(mockTransaction as any);

            const result = await TransactionRepository.createTransaction({
                amount: 100,
                type: 'INCOME',
                description: 'Salary',
            });

            expect(Transaction.create).toHaveBeenCalledWith({
                amount: 100,
                type: 'INCOME',
                description: 'Salary',
            });

            expect(result).toEqual(mockTransaction);
        });
    });

    describe('Find transaction by ID', () => {
        it('should find a transaction by ID', async () => {
            const transaction = {id:2,amount:100,type:'INCOME',description:'Salary'}

            jest.spyOn(Transaction, 'findByPk').mockResolvedValue(transaction as any);
            const result = await TransactionRepository.findTransactionById(2);

            expect(Transaction.findByPk).toHaveBeenCalledWith(2);
            expect(result).toEqual(transaction);
        });
    });
    
    describe('Update transaction', () => {
        it('should update a transaction', async () => {
            const mockTransaction = { id: 1, amount: 100, type: 'INCOME', description: 'Salary'};

            jest.spyOn(Transaction, 'update').mockResolvedValue([1, [mockTransaction]] as any);

            const result = await TransactionRepository.updateTransaction(1, {
                amount: 150,
                type: 'EXPENSE',
                description: 'Groceries',
            });

            expect(Transaction.update).toHaveBeenCalledWith(
                { amount: 150, type: 'EXPENSE', description: 'Groceries' },
                { where: { id: 1 }, returning: true }
            );

            expect(result).toEqual([1, [mockTransaction]]);
        });
    });

    describe('Delete transaction', () => {
        it('should delete a transaction', async () => {
            jest.spyOn(Transaction, 'destroy').mockResolvedValue(1 as any);

            const result = await TransactionRepository.deleteTransaction(1);

            expect(Transaction.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(result).toEqual(1);
        });
    });

    describe('Find all transactions', () => {
        it('should find all transactions', async () => {
            const transactions = [
                { id: 1, amount: 100, type: 'INCOME', description: 'Salary' },
                { id: 2, amount: 50, type: 'EXPENSE', description: 'Groceries' },
            ];

            jest.spyOn(Transaction, 'findAll').mockResolvedValue(transactions as any);

            const result = await TransactionRepository.findAllTransactions();

            expect(Transaction.findAll).toHaveBeenCalledWith({ where: {} });
            expect(result).toEqual(transactions);
        });
    });

    describe('Find all transactions with filter', () => {
        it('should find all transactions with filter', async () => {
            const transactions = [
                { id: 1, amount: 100, type: 'INCOME', description: 'Salary' },
                { id: 2, amount: 50, type: 'EXPENSE', description: 'Groceries' },
            ];

            jest.spyOn(Transaction, 'findAll').mockResolvedValue(transactions as any);

            const result = await TransactionRepository.findAllTransactions({ type: 'INCOME' });

            expect(Transaction.findAll).toHaveBeenCalledWith({ where: { type: 'INCOME' } });
            expect(result).toEqual(transactions);
        });
    });

});