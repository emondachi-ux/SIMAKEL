import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = {
    success: 'bg-success text-white',
    error: 'bg-danger text-white',
    info: 'bg-primary-600 text-white',
  }[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`px-4 py-3 rounded-lg shadow-lg ${bgColor}`}
    >
      {message}
    </motion.div>
  );
};

export const ToastContainer: React.FC<{ toasts: Array<{ id: string; props: Omit<ToastProps, 'onClose'> }> }> = ({
  toasts,
}) => {
  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      <AnimatePresence>
        {/* Render toasts here */}
      </AnimatePresence>
    </div>
  );
};
