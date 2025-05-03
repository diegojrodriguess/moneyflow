import { describe, expect, beforeAll, jest, it } from '@jest/globals';
import { Transaction } from '../../models/Transaction';
import { TransactionRepository } from '../../repositories/TransactionRepository';
import { TransactionService } from '../../service/TransactionService';

const transactionRepository = require('../../repositories/TransactionRepository');
jest.mock('../../repositories/TransactionRepository', () => {
    return {
        TransactionRepository: jest.fn().mockImplementation(() => {
            return {
                createTransaction: jest.fn(),
                findTransactionById: jest.fn(),
                updateTransaction: jest.fn(),
                deleteTransaction: jest.fn(),
                findAllTransactions: jest.fn(),
            };
        }),
    };
});

describe('Testing Transaction service', () => {
    let transactionService: TransactionService;
    let transactionRepositoryMock: jest.Mocked<TransactionRepository>;
    beforeAll(() => {
        jest.clearAllMocks(); // Clear mocks before each test
        transactionRepositoryMock = new transactionRepository.TransactionRepository() as jest.Mocked<TransactionRepository>;
        transactionService = new TransactionService(transactionRepositoryMock);
    });

    it('should create a transaction', async () => {
        const transactionData = { id: 1, amount: 100, type: 'INCOME', description: 'Salary' } as Transaction;

        transactionRepositoryMock.createTransaction.mockResolvedValue(transactionData);
        const result = await transactionService.createTransaction(transactionData);

        expect(transactionRepositoryMock.createTransaction).toHaveBeenCalledWith(transactionData);
        expect(result).toEqual(transactionData);
    });

    it('should get a transaction by id', async () => {
        const transactionData = { id: 1, amount: 100, type: 'INCOME', description: 'Salary' } as Transaction;

        transactionRepositoryMock.findTransactionById.mockResolvedValue(transactionData);
        const result = await transactionService.getTransactionById(1);

        expect(transactionRepositoryMock.findTransactionById).toHaveBeenCalledWith(1);
        expect(result).toEqual(transactionData);
    });

    it('should update a transaction', async () => {
        const transactionData = { id: 1, amount: 100, type: 'INCOME', description: 'Salary' } as Transaction;
        const updatedData = { amount: 200 } as Partial<Transaction>;

        transactionRepositoryMock.updateTransaction.mockResolvedValue([1, [transactionData]]);
        const result = await transactionService.updateTransaction(1, updatedData);

        expect(transactionRepositoryMock.updateTransaction).toHaveBeenCalledWith(1, updatedData);
        expect(result).toEqual([1, [transactionData]]);
    });

    it('should delete a transaction', async () => {
        const transactionId = 1;

        transactionRepositoryMock.deleteTransaction.mockResolvedValue(1);
        const result = await transactionService.deleteTransaction(transactionId);

        expect(transactionRepositoryMock.deleteTransaction).toHaveBeenCalledWith(transactionId);
        expect(result).toEqual(1);
    });

    it('should get all transactions', async () => {
        const transactionData = [
            { id: 1, amount: 100, type: 'INCOME', description: 'Salary' } as Transaction,
            { id: 2, amount: 50, type: 'EXPENSE', description: 'Groceries' } as Transaction,
        ];

        transactionRepositoryMock.findAllTransactions.mockResolvedValue(transactionData);
        const result = await transactionService.getAllTransactions();

        expect(transactionRepositoryMock.findAllTransactions).toHaveBeenCalledWith({});
        expect(result).toEqual(transactionData);
    });

    it('should get all transactions with filter', async () => {
        const transactionData = [
            { id: 1, amount: 100, type: 'INCOME', description: 'Salary' } as Transaction,
            { id: 2, amount: 50, type: 'EXPENSE', description: 'Groceries' } as Transaction,
        ];

        const filter: Partial<Transaction> = { type: 'INCOME' };
        transactionRepositoryMock.findAllTransactions.mockResolvedValue(transactionData);
        const result = await transactionService.getAllTransactions(filter);

        expect(transactionRepositoryMock.findAllTransactions).toHaveBeenCalledWith(filter);
        expect(result).toEqual(transactionData);
    });
});