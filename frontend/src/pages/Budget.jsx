import { PieChart, TrendingUp, Settings } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTransactionStore } from "../stores/useTransactionStore";
import { useBudgetStore } from "../stores/useBudgetStore";
import DateManager from "../components/DateManager";
import { DateContext } from "../context/DateContext";

const Budget = () => {
  const { transactions } = useTransactionStore();
  const { budgets, addBudget } = useBudgetStore();
  const { selectedMonth, selectedYear } = useContext(DateContext);

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const canSetBudget =
    selectedMonth === currentMonth && selectedYear === currentYear;

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

  const [editingBudget, setEditingBudget] = useState(null);
  const [newBudgetAmount, setNewBudgetAmount] = useState("");

  // Dummy function for now - will be replaced with Zustand action
  const updateBudget = (category, amount) => {
    addBudget(category, amount);
  };

  const getCategorySpending = (category) => {
    return filteredTransactions
      .filter((transaction) => transaction.category === category)
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  const handleEditBudget = (category) => {
    // Find existing budget for this category if it exists
    const existingBudget = budgets.find((b) => b.category === category);
    const currentAmount = existingBudget ? existingBudget.budgetAmount : 0;
    setEditingBudget(category);
    setNewBudgetAmount(currentAmount.toString());
  };

  const handleSaveBudget = () => {
    if (editingBudget) {
      updateBudget(editingBudget, Number(newBudgetAmount));
    }
    setEditingBudget(null);
  };

  // Filter transactions by selected month/year
  const filteredTransactions = transactions.filter((transaction) => {
    const date = new Date(transaction.createdAt);
    return (
      date.getFullYear() === selectedYear &&
      date.getMonth() + 1 === selectedMonth
    );
  });

  // Filter budgets by selected month/year - added this part
  const filteredBudgets = budgets.filter((budget) => {
    const date = new Date(budget.createdAt);
    return (
      date.getFullYear() === selectedYear &&
      date.getMonth() + 1 === selectedMonth
    );
  });

  // Get budget amount for a specific category - updated to use filteredBudgets
  const getBudgetForCategory = (category) => {
    const budget = filteredBudgets.find((b) => b.category === category);
    return budget ? budget.budgetAmount : 0;
  };

  // Prepare data for display
  const budgetData = categories.map((category) => {
    const budgetAmount = getBudgetForCategory(category);
    const spentAmount = getCategorySpending(category);

    return {
      category,
      budget: budgetAmount,
      spent: spentAmount,
      difference: budgetAmount - spentAmount,
    };
  });

  // Calculate totals
  const totalBudget = budgetData.reduce((sum, item) => sum + item.budget, 0);
  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);

  // Prepare data for the chart
  const chartData = budgetData.map((item) => ({
    name: item.category,
    budget: item.budget,
    spent: item.spent,
    difference: item.difference,
  }));

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h1 className="text-lg sm:text-3xl font-bold text-gray-80">
              Budget Management
            </h1>
          </div>
        </div>

        <DateManager />

        {/* Summary Stats */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-sm text-indigo-600 font-medium">
                Total Budget
              </p>
              <p className="text-2xl font-bold text-gray-800">
                ${totalBudget.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Total Spent</p>
              <p className="text-2xl font-bold text-gray-800">
                ${totalSpent.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Budget Comparison Chart */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="flex items-center justify-between p-4 sm:p-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 flex items-center">
              <TrendingUp className="h-4 w-4 md:h-5 md:w-5 mr-2 text-indigo-600" />
              Budget vs Actual Spending
            </h2>
          </div>
          <div className="h-60 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 40,
                  ...(window.innerWidth > 640 && {
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }),
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={40}
                  tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
                  interval={0}
                />
                <YAxis tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    fontSize: window.innerWidth < 640 ? "0.75rem" : "0.875rem",
                  }}
                />
                <Legend
                  wrapperStyle={{
                    fontSize: window.innerWidth < 640 ? "0.75rem" : "0.875rem",
                    paddingTop: window.innerWidth < 640 ? 15 : 10,
                  }}
                />
                <Bar
                  dataKey="budget"
                  fill="#8884d8"
                  name="Budget"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="spent"
                  fill="#82ca9d"
                  name="Spent"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Budget Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Budget List */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Settings className="h-5 w-5 mr-2 text-indigo-600" />
              Category Budgets
            </h2>
            <div className="space-y-4">
              {budgetData.map((item) => (
                <div
                  key={item.category}
                  className="border-b border-gray-100 pb-4 last:border-0"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {item.category}
                      </h3>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-500 mr-2">
                          Budget:
                        </span>
                        {editingBudget === item.category ? (
                          <input
                            type="number"
                            value={newBudgetAmount}
                            onChange={(e) => setNewBudgetAmount(e.target.value)}
                            className="w-24 px-2 py-1 border border-gray-300 rounded"
                          />
                        ) : (
                          <span className="font-medium">
                            {item.budget > 0 ? `$${item.budget}` : "Not set"}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-1">
                        Spent: ${item.spent}
                      </div>
                      <div
                        className={`text-sm font-medium ${
                          item.spent > item.budget && item.budget > 0
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {item.budget > 0 ? (
                          <>
                            {item.spent > item.budget ? "Over by" : "Remaining"}{" "}
                            ${Math.abs(item.budget - item.spent)}
                          </>
                        ) : (
                          "Budget not set"
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    {editingBudget === item.category ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveBudget}
                          className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingBudget(null)}
                          className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : canSetBudget ? ( // <<==== only allow setting budget if current month
                      <button
                        onClick={() => handleEditBudget(item.category)}
                        className={`${
                          item.budget > 0 && "hidden"
                        } text-sm text-indigo-600 hover:text-indigo-800`}
                      >
                        {item.budget > 0 ? "" : "Set Budget"}
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Progress */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-indigo-600" />
              Budget Utilization
            </h2>
            <div className="space-y-6">
              {budgetData.map((item) => {
                const percentage =
                  item.budget > 0
                    ? Math.min(100, (item.spent / item.budget) * 100)
                    : 0;

                return (
                  <div key={item.category}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {item.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        ${item.spent}{" "}
                        {item.budget > 0
                          ? `of $${item.budget} (${percentage.toFixed(1)}%)`
                          : "• Budget not set"}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      {item.budget > 0 ? (
                        <div
                          className={`h-2.5 rounded-full ${
                            percentage > 100
                              ? "bg-red-500"
                              : percentage > 80
                              ? "bg-yellow-500"
                              : "bg-indigo-600"
                          }`}
                          style={{ width: `${Math.min(100, percentage)}%` }}
                        ></div>
                      ) : (
                        <div
                          className="h-2.5 rounded-full bg-gray-400"
                          style={{
                            width: item.spent > 0 ? "100%" : "0%",
                            opacity: 0.3,
                          }}
                        ></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
