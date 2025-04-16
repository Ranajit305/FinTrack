import {
  DollarSign,
  BarChart3,
  LayoutDashboard,
  Tags,
  Wallet,
  Menu,
  X,
  BadgeDollarSign,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-white shadow-sm py-4 px-4 sm:px-6 sticky top-0 z-10">

      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <DollarSign className="h-7 w-7 sm:h-8 sm:w-8 text-indigo-600 mr-2" />
          <span className="text-lg sm:text-xl font-bold text-gray-800">
            FinTrack
          </span>
        </Link>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden sm:flex items-center space-x-4 lg:space-x-6 text-gray-700 font-medium">
          <Link
            to="/dashboard"
            className="flex items-center hover:text-indigo-600"
          >
            <LayoutDashboard className="h-5 w-5 mr-1" />
            Dashboard
          </Link>
          <Link
            to="/transactions"
            className="flex items-center hover:text-indigo-600"
          >
            <BadgeDollarSign className="h-5 w-5 mr-1" />
            Transactions
          </Link>
          <Link
            to="/analytics"
            className="flex items-center hover:text-indigo-600"
          >
            <BarChart3 className="h-5 w-5 mr-1" />
            Analytics
          </Link>
          <Link
            to="/budget"
            className="flex items-center hover:text-indigo-600"
          >
            <Wallet className="h-5 w-5 mr-1" />
            Budget
          </Link>
        </div>

        {/* Mobile Menu Button - Visible only on mobile */}
        <button
          className="sm:hidden text-gray-600 focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu - Shows when toggled */}
      {isMenuOpen && (
        <div className="sm:hidden mt-4 pt-4 border-t border-gray-200">
          <div onClick={() => setIsMenuOpen(false)} className="flex flex-col space-y-4 text-gray-700 font-medium">
            <Link
              to="/dashboard"
              className="flex items-center hover:text-indigo-600 py-2"
            >
              <LayoutDashboard className="h-5 w-5 mr-2" />
              Dashboard
            </Link>
            <Link
              to="/transactions"
              className="flex items-center hover:text-indigo-600 py-2"
            >
              <BadgeDollarSign className="h-5 w-5 mr-2" />
              Transactions
            </Link>
            <Link
              to="/analytics"
              className="flex items-center hover:text-indigo-600 py-2"
            >
              <BadgeDollarSign className="h-5 w-5 mr-2" />
              Analytics
            </Link>
            <Link
              to="/budget"
              className="flex items-center hover:text-indigo-600 py-2"
            >
              <Wallet className="h-5 w-5 mr-2" />
              Budget
            </Link>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Navbar;
