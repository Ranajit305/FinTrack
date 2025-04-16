import { useTransactionStore } from "../stores/useTransactionStore";
import { useBudgetStore } from "../stores/useBudgetStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import DateManager from "../components/DateManager";
import { useContext } from "react";
import { DateContext } from "../context/DateContext";
import { ClockIcon } from "lucide-react";

const Dashboard = () => {
  const { transactions } = useTransactionStore();
  const { budgets } = useBudgetStore();
  const { selectedMonth, selectedYear } = useContext(DateContext);

  // Filter transactions by selected month & year
  const filteredTransactions = transactions.filter((t) => {
    const date = new Date(t.createdAt);
    return (
      date.getFullYear() === selectedYear &&
      date.getMonth() + 1 === selectedMonth // getMonth() is zero-based
    );
  });

  // Filter budgets by selected month & year
  const filteredBudgets = budgets.filter((b) => {
    const date = new Date(b.createdAt);
    return (
      date.getFullYear() === selectedYear &&
      date.getMonth() + 1 === selectedMonth
    );
  });

  // Calculate total expenses for filtered transactions
  const totalExpenses = filteredTransactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );

  // Calculate total budget for filtered budgets
  const totalBudget = filteredBudgets.reduce(
    (sum, b) => sum + b.budgetAmount,
    0
  );

  const remainingBudget = totalBudget - totalExpenses;
  const totalTransactions = filteredTransactions.length;

  // Get recent 5 transactions from filtered data
  const recentTransactions = [...filteredTransactions]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // Prepare data for Category Chart
  const categoryData = filteredBudgets.map((budget) => {
    const spent = filteredTransactions
      .filter((t) => t.category === budget.category)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      name: budget.category,
      budget: budget.budgetAmount,
      spent,
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 p-4">
      <div className="mx-auto max-w-6xl">

      <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h1 className="text-lg sm:text-3xl font-bold text-gray-80">
              Dashboard
            </h1>
          </div>
        </div>

        <div>
          <DateManager />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 font-medium">Total Expenses</h3>
            <p className="text-2xl font-bold text-red-500">
              ${totalExpenses}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 font-medium">Total Budget</h3>
            <p className="text-2xl font-bold text-blue-500">
              ${totalBudget}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 font-medium">Remaining Budget</h3>
            <p className="text-2xl font-bold text-green-500">
              ${remainingBudget}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 font-medium">Total Transactions</h3>
            <p className="text-2xl font-bold text-purple-500">
              {totalTransactions}
            </p>
          </div>
        </div>

        {/* Budget vs. Expense Line Chart */}
        <div className="bg-white rounded-lg shadow pb-5 pr-5 mb-6">
          <h2 className="text-lg md:text-xl p-4 md:p-6 font-semibold mb-3 md:mb-4">
            Budget vs. Expenses
          </h2>
          <div className="h-60 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={categoryData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 0,
                  bottom: 5,
                  ...(window.innerWidth > 640 && {
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }),
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
                  angle={window.innerWidth < 640 ? -45 : 0}
                  textAnchor={window.innerWidth < 640 ? "end" : "middle"}
                  height={window.innerWidth < 640 ? 60 : 30}
                />
                <YAxis tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }} />
                <Tooltip
                  contentStyle={{
                    fontSize: window.innerWidth < 640 ? "0.75rem" : "0.875rem",
                    padding: window.innerWidth < 640 ? "8px" : "10px",
                  }}
                />
                <Legend
                  wrapperStyle={{
                    fontSize: window.innerWidth < 640 ? "0.75rem" : "0.875rem",
                    paddingTop: "10px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="budget"
                  stroke="#3B82F6"
                  name="Budget"
                  strokeWidth={window.innerWidth < 640 ? 1.5 : 2}
                  dot={{ r: window.innerWidth < 640 ? 3 : 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="spent"
                  stroke="#EF4444"
                  name="Spent"
                  strokeWidth={window.innerWidth < 640 ? 1.5 : 2}
                  dot={{ r: window.innerWidth < 640 ? 3 : 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <ClockIcon className="h-5 w-5 mr-2 text-indigo-600" />
            Recent Transactions
          </h2>

          {/* Desktop view */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentTransactions.map((t, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-700">
                      {t.description}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                        {t.category}
                      </span>
                    </td>
                    <td
                      className={`py-4 px-4 whitespace-nowrap text-sm font-medium ${
                        t.type === "income" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {t.type === "income" ? "+" : "-"}${t.amount}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(t.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile view */}
          <div className="sm:hidden space-y-4">
            {recentTransactions.map((t, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium text-gray-800">
                    {t.description}
                  </div>
                  <div
                    className={`font-bold ${
                      t.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}${t.amount}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-800">
                    {t.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {recentTransactions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No recent transactions to display
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
