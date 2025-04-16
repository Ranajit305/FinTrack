import Transaction from "../models/transaction.model.js"

export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({}).sort({ createdAt: -1 });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export const addTransaction = async (req, res) => {
    try {
        const { amount, description, category } = req.body;

        // Basic validation
        if (!amount || !description || !category) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newTransaction = new Transaction({
            amount,
            description,
            category
        });

        const savedTransaction = await newTransaction.save();
        res.status(201).json({ success: true, savedTransaction});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const editTransaction = async (req, res) => {
    try {
        const { transactionId } = req.params;
        const { amount, description, category } = req.body;

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            transactionId,
            { amount, description, category },
            { new: true }
        );

        if (!updatedTransaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.status(200).json({ success: true, updatedTransaction});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteTransaction = async (req, res) => {
    try {
        const { transactionId } = req.params;

        const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);

        if (!deletedTransaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.status(200).json({ success: true, message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};