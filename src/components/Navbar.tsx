import React from 'react';
import { Home, User, Plus, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg border-b-2 border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/image.png" 
              alt="Farm2Hand Logo" 
              className="h-10 w-10 rounded-full"
            />
            <span className="text-2xl font-bold text-green-600">Farm2Hand</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#" 
              className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-green-50"
            >
              <Home size={20} />
              <span className="font-medium">Home</span>
            </a>
            <a 
              href="#" 
              className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-2 rounded-md font-medium"
            >
              <User size={20} />
              <span>My Profile</span>
            </a>
            <a 
              href="#" 
              className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-green-50"
            >
              <Plus size={20} />
              <span className="font-medium">Add Product</span>
            </a>
            <button className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-red-50">
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-green-600 p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;