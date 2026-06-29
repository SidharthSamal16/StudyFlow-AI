import React from 'react';
import { motion } from 'framer-motion';

export interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'error';
  height?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = 'primary',
  height = 'md',
  showLabel = false
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const colors = {
    primary: 'bg-primary-500 dark:bg-primary-600',
    accent: 'bg-accent-500 dark:bg-accent-600',
    success: 'bg-success-500 dark:bg-success-600',
    warning: 'bg-warning-500 dark:bg-warning-600',
    error: 'bg-error-500 dark:bg-error-600'
  };

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  return (
    <div className="w-full flex flex-col gap-1.5">
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden ${heights[height]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`h-full rounded-full ${colors[color]}`}
        />
      </div>
    </div>
  );
};
