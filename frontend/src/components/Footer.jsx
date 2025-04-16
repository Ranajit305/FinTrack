import { DollarSign, Facebook, Github, Linkedin, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-indigo-600 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-white mr-2" />
                <span className="text-2xl font-bold">FinTrack</span>
              </div>
              <p className="text-white/70">
                Take control of your finances with our intuitive money
                management tools.
              </p>
              <div className="flex space-x-4">
                <a href="#">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#">
                  <Github className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="hidden md:block">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <a href="#">Transactions</a>
                </li>
                <li>
                  <a href="#">Budgets</a>
                </li>
                <li>
                  <a href="#">Reports</a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="hidden md:block">
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Help Center</a>
                </li>
                <li>
                  <a href="#">Tutorials</a>
                </li>
                <li>
                  <a href="#">API Docs</a>
                </li>
              </ul>
            </div>

            {/* Mobile Links */}
            <div className="flex md:hidden items-center justify-around">
              <div className="">
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#">Dashboard</a>
                  </li>
                  <li>
                    <a href="#">Transactions</a>
                  </li>
                  <li>
                    <a href="#">Budgets</a>
                  </li>
                  <li>
                    <a href="#">Reports</a>
                  </li>
                </ul>
              </div>

              <div className="">
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="#">Help Center</a>
                  </li>
                  <li>
                    <a href="#">Tutorials</a>
                  </li>
                  <li>
                    <a href="#">API Docs</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <p className="text-white mb-4">
                Subscribe to our newsletter for financial tips and updates.
              </p>
              <div className="flex rounded-2xl bg-indigo-500 overflow-hidden shadow-md">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow pl-4 py-3 bg-transparent placeholder-white text-white focus:outline-none"
                />
                <button className="bg-white text-indigo-700 hover:bg-indigo-100 px-2 font-semibold transition py-3">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/20 mt-10 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-white">
                © {new Date().getFullYear()} FinTrack. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
