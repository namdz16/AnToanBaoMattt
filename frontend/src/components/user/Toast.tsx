import React from 'react';

type ToastProps = {
  message: string;
  type?: 'success' | 'error' | 'info';
};

const Toast: React.FC<ToastProps> = ({ message, type = 'info' }) => {
  if (!message) return null;
  let bg = 'bg-blue-500';
  if (type === 'success') bg = 'bg-green-500';
  if (type === 'error') bg = 'bg-red-500';
  return (
    <div className={`fixed top-4 right-4 px-4 py-2 rounded text-white shadow-lg z-50 ${bg}`}>
      {message}
    </div>
  );
};

export default Toast;