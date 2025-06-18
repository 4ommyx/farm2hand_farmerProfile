import React from 'react';
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';
import ProductDetail from './components/ProductDetail';
import ToastContainer from './components/ToastContainer';
import { useToast } from './hooks/useToast';

function App() {
  const { toasts, showSuccess, showError, showWarning, removeToast } = useToast();

  const handleToastShow = (message: string, type: 'success' | 'error' | 'warning') => {
    switch (type) {
      case 'success':
        showSuccess(message);
        break;
      case 'error':
        showError(message);
        break;
      case 'warning':
        showWarning(message);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to Your Farm Dashboard
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Manage your farm profile and showcase your fresh, quality products directly to consumers. 
              Build trust with your customers through detailed profiles and product information.
            </p>
          </div>

          {/* User Profile Section */}
          <UserProfile onToastShow={handleToastShow} />

          {/* Product Detail Section */}
          <ProductDetail onToastShow={handleToastShow} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img 
                src="/image.png" 
                alt="Farm2Hand Logo" 
                className="h-8 w-8 rounded-full"
              />
              <span className="text-xl font-bold text-green-600">Farm2Hand</span>
            </div>
            <p className="text-gray-600">
              Connecting farmers directly with consumers for fresh, quality produce.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              © 2025 Farm2Hand. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}

export default App;