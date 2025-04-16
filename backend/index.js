import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import 'dotenv/config';

import { connectDB } from './db/connectDB.js';
import transactionRouter from './routes/transaction.route.js';
import budgetRouter from './routes/budget.route.js'

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/transaction', transactionRouter);
app.use('/api/budget', budgetRouter);

app.get('/', (req, res) => {
    res.send("API Working");
})

// Start Server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});