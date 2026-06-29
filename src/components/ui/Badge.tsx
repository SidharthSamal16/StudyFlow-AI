import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'solid' | 'subtle' | 'outline';
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'slate';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'subtle',
  color = 'primary',
  className = ''
}) => {
  const baseStyle = 'inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full tracking-wide transition-all';
  
  const styles = {
    primary: {
      solid: 'bg-primary-600 text-white',
      subtle: 'bg-primary-50 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300 border border-primary-500/10',
      outline: 'border border-primary-500 text-primary-600 dark:text-primary-400'
    },
    accent: {
      solid: 'bg-accent-500 text-white',
      subtle: 'bg-accent-50 text-accent-700 dark:bg-accent-950/40 dark:text-accent-300 border border-accent-500/10',
      outline: 'border border-accent-500 text-accent-600 dark:text-accent-400'
    },
    success: {
      solid: 'bg-success-600 text-white',
      subtle: 'bg-success-50 text-success-700 dark:bg-success-950/40 dark:text-success-300 border border-success-500/10',
      outline: 'border border-success-500 text-success-600'
    },
    warning: {
      solid: 'bg-warning-500 text-white',
      subtle: 'bg-warning-50 text-warning-700 dark:bg-warning-950/40 dark:text-warning-300 border border-warning-500/10',
      outline: 'border border-warning-500 text-warning-600'
    },
    error: {
      solid: 'bg-error-600 text-white',
      subtle: 'bg-error-50 text-error-700 dark:bg-error-950/40 dark:text-error-300 border border-error-500/10',
      outline: 'border border-error-500 text-error-600'
    },
    slate: {
      solid: 'bg-slate-700 text-white dark:bg-slate-300 dark:text-slate-900',
      subtle: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50',
      outline: 'border border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-400'
    }
  };

  return (
    <span className={`${baseStyle} ${styles[color][variant]} ${className}`}>
      {children}
    </span>
  );
};
