import { create } from 'zustand'
import { axiosUrl } from '../utils/axios';
import toast from 'react-hot-toast';

export const useBudgetStore = create((set, get) => ({
    budgets: [],

    getBudgets: async () => {
        try {
            const res = await axiosUrl.get('/budget');
            if (res.data.success) {
                set({ budgets: res.data.budgets });
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    },

    addBudget: async (category, budgetAmount) => {
        try {
            const res = await axiosUrl.post('/budget', { category, budgetAmount });
            set((state) => ({
                budgets: [...state.budgets, res.data.savedBudget]
            }))
        } catch (error) {
            toast.dismiss();
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        }
    },
}))