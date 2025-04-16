import React, { useState } from "react";
import { X, DollarSign, Type, Tag } from "lucide-react";
import { useTransactionStore } from "../stores/useTransactionStore";

const EditTransaction = ({ selectedTransaction, setSelectedTransaction, setEditTransactionForm }) => {
  const { editTransaction } = useTransactionStore();

  const [newTransaction, setNewTransaction] = useState({
    amount: selectedTransaction.amount,
    description: selectedTransaction.description,
    category: selectedTransaction.category,
  });

  const categories = [
    "Food",
    "Rent",
    "Entertainment",
    "Utilities",
    "Travel",
    "Health",
    "Shopping",
    "Other",
  ];

  const handleTransactionClose = () => {
    setSelectedTransaction('');
    setEditTransactionForm(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    editTransaction(selectedTransaction._id, Number(newTransaction.amount), newTransaction.description, newTransaction.category);
    setEditTransactionForm(false);
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] backdrop-blur-sm z-50 flex items-center justify-center">
      {/* Modal Container */}
      <div className="w-full max-w-lg mx-4 sm:mx-auto">
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl transform transition-all">
          {/* Modal Header */}
          <div className="bg-indigo-600 px-4 sm:px-6 py-4 flex justify-between items-center">
            <h3 className="text-lg font-medium text-white">
              Edit Transaction
            </h3>
            <button
              onClick={() => handleTransactionClose()}
              className="text-white hover:text-indigo-200 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="bg-white px-4 sm:px-6 py-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Amount Field */}
                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Amount
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="amount"
                      value={newTransaction.amount}
                      onChange={(e) =>
                        setNewTransaction({
                          ...newTransaction,
                          amount: e.target.value,
                        })
                      }
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 py-3 border-gray-300 rounded-lg border outline-indigo-500"
                      placeholder="0.00"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 sm:text-sm">USD</span>
                    </div>
                  </div>
                </div>

                {/* Description Field */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Type className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="description"
                      value={newTransaction.description}
                      onChange={(e) =>
                        setNewTransaction({
                          ...newTransaction,
                          description: e.target.value,
                        })
                      }
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 py-3 border-gray-300 rounded-lg border outline-indigo-500"
                      placeholder="What was this for?"
                      required
                    />
                  </div>
                </div>

                {/* Category Field */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="category"
                      value={newTransaction.category}
                      onChange={(e) =>
                        setNewTransaction({
                          ...newTransaction,
                          category: e.target.value,
                        })
                      }
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 py-3 border-gray-300 rounded-lg border appearance-none bg-white outline-indigo-500"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-8 flex justify-end space-x-3">
                <button
                  type="submit"
                  className="px-4 py-2 cursor-pointer bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTransaction;
