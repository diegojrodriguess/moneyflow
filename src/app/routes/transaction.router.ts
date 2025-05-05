import { Request, Response } from "express";
import { TransactionController } from "../controller/TransactionController";
import { TransactionService } from "../service/TransactionService";
import { TransactionRepository } from "../repositories/TransactionRepository";

const transactionRepository = new TransactionRepository();
const transactionService = new TransactionService(transactionRepository);
const transactionController = new TransactionController(transactionService);

const express = require('express')
const router = express.Router()

router.get('/', (req: Request, res: Response) => {
    return transactionController.getAllTransactions(req, res);
}
)

router.get('/:id', (req: Request, res: Response) => {
    return transactionController.getTransactionById(req, res);
}
)

router.post('/', (req: Request, res: Response) => {
    return transactionController.createTransaction(req, res);
}
)

router.put('/:id', (req: Request, res: Response) => {
    return transactionController.updateTransaction(req, res);
}
)

router.delete('/:id', (req: Request, res: Response) => {
    return transactionController.deleteTransaction(req, res);
}
)

export default router;