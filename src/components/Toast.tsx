import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';
// Unused icon cleaned up: Info
// import { CheckCircle2, Info, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] max-w-md bg-brand-navy text-white px-5 py-3.5 rounded-xl shadow-2xl border border-gray-700 flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
      <p className="text-sm font-medium leading-snug flex-1">{message}</p>
      <button 
        onClick={onClose}
        className="text-gray-400 hover:text-white transition-colors p-1 rounded-md cursor-pointer"
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
