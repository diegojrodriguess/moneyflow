import { Request, Response } from 'express';
import { TransactionService } from '../service/TransactionService';
import { Transaction } from '../models/Transaction';

export class TransactionController{
    constructor(private transactionService: TransactionService) {}

    async createTransaction(req: Request, res: Response): Promise<Response> {
        try {
            const transactionData: Partial<Transaction> = req.body;
            const newTransaction = await this.transactionService.createTransaction(transactionData);
            return res.status(201).json(newTransaction);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to create transaction' });
        }
    }

    async getTransactionById(req: Request, res: Response): Promise<Response> {
        try {
            const transactionId = parseInt(req.params.id);
            const transaction = await this.transactionService.getTransactionById(transactionId);
            if (!transaction) {
                return res.status(404).json({ error: 'Transaction not found' });
            }
            return res.status(200).json(transaction);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve transaction' });
        }
    }

    async updateTransaction(req: Request, res: Response): Promise<Response> {
        try {
            const transactionId = parseInt(req.params.id);
            const transactionData: Partial<Transaction> = req.body;
            const updatedTransaction = await this.transactionService.updateTransaction(transactionId, transactionData);
            if (!updatedTransaction) {
                return res.status(404).json({ error: 'Transaction not found' });
            }
            return res.status(200).json(updatedTransaction);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to update transaction' });
        }
    }

    async deleteTransaction(req: Request, res: Response): Promise<Response> {
        try {
            const transactionId = parseInt(req.params.id);
            const deletedTransaction = await this.transactionService.deleteTransaction(transactionId);
            if (!deletedTransaction) {
                return res.status(404).json({ error: 'Transaction not found' });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete transaction' });
        }
    }

    async getAllTransactions(req: Request, res: Response): Promise<Response> {
        try {
            const transactions = await this.transactionService.getAllTransactions();
            return res.status(200).json(transactions);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve transactions' });
        }
    }
}