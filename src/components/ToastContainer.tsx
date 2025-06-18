import React from 'react';
import Toast, { ToastProps } from './Toast';

interface ToastContainerProps {
  toasts: ToastProps[];
  onClose: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Center-top toast container */}
      <div className="flex justify-center pt-8 px-4">
        <div className="w-full max-w-md space-y-4 pointer-events-auto">
          {toasts.map((toast, index) => (
            <div
              key={toast.id}
              style={{
                zIndex: 1000 - index,
              }}
            >
              <Toast {...toast} onClose={onClose} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToastContainer;