import express from 'express';
import { addTransaction, editTransaction, deleteTransaction, getAllTransactions } from '../controllers/transaction.controller.js';

const router = express.Router();

router.get('/', getAllTransactions);
router.post('/', addTransaction);
router.put('/:transactionId', editTransaction);
router.delete('/:transactionId', deleteTransaction);

export default router;
