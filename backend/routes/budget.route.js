import express from 'express'
import { addBudget, getBudgets } from '../controllers/budget.controller.js';

const router = express.Router();

router.get('/', getBudgets);
router.post('/', addBudget);

export default router