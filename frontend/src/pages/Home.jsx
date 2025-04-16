import React from "react";
import {
  ArrowRight,
  PieChart,
  DollarSign,
  TrendingUp,
  Bell,
  CreditCard,
} from "lucide-react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className=" bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Take Control of Your{" "}
            <span className="text-indigo-600">Personal Finance</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 md:mb-8 px-2">
            Keep track of your expenses, visualize your spending, and achieve
            your financial goals with our intuitive money management tools.
          </p>
          <Link
            to="/dashboard"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium text-base sm:text-lg shadow-md transition-all transform hover:scale-105 w-full sm:w-auto"
          >
            Manage Expenses{" "}
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 inline ml-2" />
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3 md:mb-4">
              <PieChart className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
              Expense Tracking
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Categorize and monitor every transaction to understand where your
              money goes each month.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3 md:mb-4">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
              Budget Planning
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Set realistic budgets and get alerts when you're approaching your
              spending limits.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3 md:mb-4">
              <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
              Bill Reminders
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Never miss a payment with automated reminders for your recurring
              bills and subscriptions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
