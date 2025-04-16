import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        min: [0, 'Amount must be positive']
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Food', 
            'Rent', 
            'Entertainment', 
            'Utilities', 
            'Travel', 
            'Health', 
            'Shopping', 
            'Other'
        ]
    }
}, { timestamps: true });

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
export default Transaction