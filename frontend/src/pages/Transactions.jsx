import { useContext, useEffect, useState } from "react";
import { Plus, Trash, FolderX, Edit, ClipboardList } from "lucide-react";

import AddTransaction from "../components/AddTransaction";
import { useTransactionStore } from "../stores/useTransactionStore";
import { DateContext } from "../context/DateContext";
import DateManager from "../components/DateManager";
import EditTransaction from "../components/EditTransaction";

const Transactions = () => {
  const { transactions, removeTransaction } = useTransactionStore();
  const { selectedMonth, selectedYear } = useContext(DateContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editTransactionForm, setEditTransactionForm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState('');

  const filteredTransactions = transactions.filter((transaction) => {
    const date = new Date(transaction.createdAt);
    return (
      date.getFullYear() === selectedYear &&
      date.getMonth() + 1 === selectedMonth
    );
  });

  const showEditTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setEditTransactionForm(true);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg sm:text-3xl font-bold text-gray-800">
            Transaction Management
          </h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white text-sm sm:text-base px-4 py-2 rounded-lg flex items-center"
          >
            <Plus className="h-5 w-5 mr-1" />
            Add Transaction
          </button>
        </div>

        {/* Date Selection */}
        <DateManager />

        {/* Add Transaction Form */}
        {showAddForm && <AddTransaction setShowAddForm={setShowAddForm} />}
        {editTransactionForm && <EditTransaction selectedTransaction={selectedTransaction} setSelectedTransaction={setSelectedTransaction} setEditTransactionForm={setEditTransactionForm}/>}

        {/* Transactions List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
              <ClipboardList className="h-5 w-5 mr-2 text-indigo-600" />
              All Transactions
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
                <div
                  key={index}
                  className="px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex sm:items-center justify-between gap-3 sm:gap-0">
                    <div className="flex items-center gap-3">
                      <button
                        className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                        onClick={() => showEditTransaction(transaction)}
                      >
                        <Edit className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
                      </button>
                      <div>
                        <p className="text-gray-800 font-medium text-sm sm:text-base">
                          {transaction.description}
                        </p>
                        <p className="text-gray-500 text-xs sm:text-sm">
                          {transaction.category}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <div className="text-right text-red-600">
                        <p className="font-medium text-sm sm:text-base">
                          -${transaction.amount}
                        </p>
                        <p className="text-gray-500 text-xs sm:text-sm">
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                        onClick={() => removeTransaction(transaction._id)}
                      >
                        <Trash className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-16 text-center">
                <FolderX className="h-12 w-12 mx-auto text-gray-400" />
                <p className="mt-2 text-gray-500 font-medium">
                  No transactions found
                </p>
                <p className="text-gray-400 text-sm">
                  Try changing your filter settings or add a new transaction
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
