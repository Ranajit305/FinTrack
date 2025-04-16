import { create } from 'zustand'
import { axiosUrl } from '../utils/axios';
import toast from 'react-hot-toast';

export const useTransactionStore = create((set, get) => ({
    transactions: [],

    getTransactions: async () => {
        try {
            console.log(axiosUrl);
            const res = await axiosUrl.get('/transaction');
            console.log(res);
            set({transactions: res.data })
        } catch (error) {
            console.log(error.response.data.message);
        }
    },

    addTransaction: async (amount, description, category) => {
        try {
            const res = await axiosUrl.post('/transaction', { amount, description, category });
            if (res.data.success) {
                set((state) => ({
                    transactions: [...state.transactions, res.data.savedTransaction]
                }))
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        }
    },

    editTransaction: async (transactionId, amount, description, category) => {
        try {
            const res = await axiosUrl.put(`/transaction/${transactionId}`, {amount, description, category});
            if (res.data.success) {
                set((state) => ({
                    transactions: state.transactions.map(t => t._id === transactionId ? { ...t, amount, description, category} : t)
                }))
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        }
    },

    removeTransaction: async (transactionId) => {
        try {
            const res = await axiosUrl.delete(`/transaction/${transactionId}`);
            if (res.data.success) {
                set((state) => ({
                    transactions: state.transactions.filter(transaction => transaction._id !== transactionId)
                }))
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        }
    }
}))