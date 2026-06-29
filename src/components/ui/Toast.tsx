import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from 'lucide-react';
import { useToastStore, ToastItem } from '../../store/useToastStore';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-success-500" />,
    error: <AlertCircle className="h-5 w-5 text-error-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-warning-500" />,
    info: <Info className="h-5 w-5 text-primary-500" />
  };

  const borders = {
    success: 'border-success-500/10 dark:border-success-500/20 bg-white/95 dark:bg-slate-900/95',
    error: 'border-error-500/10 dark:border-error-500/20 bg-white/95 dark:bg-slate-900/95',
    warning: 'border-warning-500/10 dark:border-warning-500/20 bg-white/95 dark:bg-slate-900/95',
    info: 'border-primary-500/10 dark:border-primary-500/20 bg-white/95 dark:bg-slate-900/95'
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9, transition: { duration: 0.15 } }}
            layout
            className={`
              flex items-start gap-3.5 p-4 rounded-xl border shadow-xl backdrop-blur-md 
              pointer-events-auto select-none overflow-hidden ${borders[toast.type]}
            `}
          >
            <div className="flex-shrink-0 mt-0.5">
              {icons[toast.type]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {toast.type.charAt(0).toUpperCase() + toast.type.slice(1)}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-0.5 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Export convenience hook/function
export const showToast = (message: string, type: ToastItem['type'] = 'success', duration?: number) => {
  useToastStore.getState().addToast(message, type, duration);
};
