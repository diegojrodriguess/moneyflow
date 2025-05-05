import { describe, expect, beforeAll, jest, it } from '@jest/globals';
import { Transaction } from '../../models/Transaction';
import { TransactionService } from '../../service/TransactionService';
import { TransactionController } from '../../controller/TransactionController';
import { Request, Response } from 'express';

const transactionService = require('../../service/TransactionService');

jest.mock('../../service/TransactionService', () => {
    return {
        TransactionService: jest.fn().mockImplementation(() => {
            return {
                createTransaction: jest.fn(),
                getTransactionById: jest.fn(),
                updateTransaction: jest.fn(),
                deleteTransaction: jest.fn(),
                getAllTransactions: jest.fn(),
            };
        }),
    };
}
);

describe('TransactionController', () => {
    let transactionController: TransactionController;
    let transactionServiceMock: jest.Mocked<TransactionService>;

    beforeAll(() => {
        transactionServiceMock = new transactionService.TransactionService() as jest.Mocked<TransactionService>;
        transactionController = new TransactionController(transactionServiceMock);
    });

    it('should create a transaction', async () => {
        const req = { body: { amount: 100, type: 'EXPENSE' } } as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
            sendStatus: jest.fn(),
            end: jest.fn(),
        } as unknown as Response;
        const transactionData = { id: 1, amount: 100, type: 'EXPENSE' } as Transaction;

        transactionServiceMock.createTransaction.mockResolvedValue(transactionData);
        await transactionController.createTransaction(req, res);
        expect(transactionServiceMock.createTransaction).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(transactionData);

    });

    it('should get a transaction by ID', async () => {
        const req = { params: { id: '1' } } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
            sendStatus: jest.fn(),
            end: jest.fn(),
        } as unknown as Response;
        const transactionData = { id: 1, amount: 100, type: 'EXPENSE' } as Transaction;

        transactionServiceMock.getTransactionById.mockResolvedValue(transactionData);
        await transactionController.getTransactionById(req, res);
        expect(transactionServiceMock.getTransactionById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(transactionData);
    });

    it('should update a transaction', async () => {
        const req = { params: { id: '1' }, body: { amount: 200 } } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
            sendStatus: jest.fn(),
            end: jest.fn(),
        } as unknown as Response;
        const transactionData = { id: 1, amount: 200, type: 'EXPENSE' } as Transaction;

        transactionServiceMock.updateTransaction.mockResolvedValue([1, [transactionData]]);
        await transactionController.updateTransaction(req, res);
        expect(transactionServiceMock.updateTransaction).toHaveBeenCalledWith(1, req.body);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should delete a transaction', async () => {
        const req = { params: { id: '1' } } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
            sendStatus: jest.fn(),
            end: jest.fn(),
        } as unknown as Response;

        transactionServiceMock.deleteTransaction.mockResolvedValue(1);
        await transactionController.deleteTransaction(req, res);
        expect(transactionServiceMock.deleteTransaction).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(204);
    });

    it('should get all transactions', async () => {
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
            sendStatus: jest.fn(),
            end: jest.fn(),
        } as unknown as Response;
        const transactionData = [
            { id: 1, amount: 100, type: 'EXPENSE' } as Transaction,
            { id: 2, amount: 200, type: 'INCOME' } as Transaction,
        ];

        transactionServiceMock.getAllTransactions.mockResolvedValue(transactionData);
        await transactionController.getAllTransactions(req, res);
        expect(transactionServiceMock.getAllTransactions).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(transactionData);
    });

    it('should get all transactions with filter', async () => {
        const req = { query: { type: 'EXPENSE' } } as unknown as Request; // Mock query parameters
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
            sendStatus: jest.fn(),
            end: jest.fn(),
        } as unknown as Response;

        const transactionData = [
            { id: 1, amount: 100, type: 'EXPENSE' } as Transaction,
            { id: 2, amount: 200, type: 'INCOME' } as Transaction,
        ];

        // Mock the service method to return the transaction data
        transactionServiceMock.getAllTransactions.mockResolvedValue(transactionData);

        // Call the controller method
        await transactionController.getAllTransactions(req, res);

        // Verify the response
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(transactionData);
    });
});