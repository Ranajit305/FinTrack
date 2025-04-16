import mongoose from "mongoose"

const budgetSchema = new mongoose.Schema({
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
    },
    budgetAmount: {
        type: Number,
        required: true,
        min: [0, 'Budget amount must be positive']
    }
}, { timestamps: true });

const Budget = mongoose.models.Budget || mongoose.model('Budget', budgetSchema);
export default Budget