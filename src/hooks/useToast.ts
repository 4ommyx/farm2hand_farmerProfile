import { useState, useCallback } from 'react';
import { ToastProps } from '../components/Toast';

export interface ToastOptions {
  type?: 'success' | 'error' | 'warning';
  duration?: number;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const showToast = useCallback((message: string, options: ToastOptions = {}) => {
    const id = Date.now().toString();
    const toast: ToastProps = {
      id,
      message,
      type: options.type || 'success',
      duration: options.duration || 4000,
      onClose: removeToast,
    };

    setToasts(prev => [...prev, toast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showSuccess = useCallback((message: string, duration?: number) => {
    showToast(message, { type: 'success', duration });
  }, [showToast]);

  const showError = useCallback((message: string, duration?: number) => {
    showToast(message, { type: 'error', duration });
  }, [showToast]);

  const showWarning = useCallback((message: string, duration?: number) => {
    showToast(message, { type: 'warning', duration });
  }, [showToast]);

  return {
    toasts,
    showToast,
    showSuccess,
    showError,
    showWarning,
    removeToast,
  };
};