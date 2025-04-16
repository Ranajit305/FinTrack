import { create } from 'zustand'
import { axiosUrl } from '../utils/axios';
import toast from 'react-hot-toast';

export const useTransactionStore = create((set, get) => ({
    transactions: [],
    loading: false,

    getTransactions: async () => {
        try {
            const res = await axiosUrl.get('/transaction');
            set({transactions: res.data })
        } catch (error) {
            console.log(error.response.data.message);
        }
    },

    addTransaction: async (amount, description, category) => {
        set({ loading: true })
        try {
            const res = await axiosUrl.post('/transaction', { amount, description, category });
            if (res.data.success) {
                set((state) => ({
                    transactions: [res.data.savedTransaction, ...state.transactions]
                }))
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        } finally {
            set({ loading: false })
        }
    },

    editTransaction: async (transactionId, amount, description, category) => {
        set({ loading: true })
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
        } finally {
            set({ loading: false })
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