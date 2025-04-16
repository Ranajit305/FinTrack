import Budget from "../models/budget.model.js"

// Get all Budgets
export const getBudgets = async (req, res) => {
    try {
      const budgets = await Budget.find({}).sort({ createdAt: -1 });
      res.status(200).json({ success: true, budgets });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
};

// Add Budget
export const addBudget = async (req, res) => {
    try {
      const { category, budgetAmount } = req.body;
  
      if (!category || budgetAmount === null) {
        return res.status(400).json({ success: false, message: 'Category and budget amount are required.' });
      }

      if (budgetAmount === 0 || budgetAmount < 0) {
        return res.status(400).json({ success: false, message: 'Invalid Amount'});
      }
  
      const newBudget = new Budget({ 
        category,
        budgetAmount 
      });

      const savedBudget = await newBudget.save();
      res.status(201).json({ success: true, message: 'Budget created successfully', savedBudget });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
};