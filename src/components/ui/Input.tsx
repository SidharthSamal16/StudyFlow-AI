import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  leftIcon,
  rightIcon,
  className = '',
  wrapperClassName = '',
  type = 'text',
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex flex-col gap-1.5 w-full ${wrapperClassName}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          ref={ref}
          type={type}
          className={`
            w-full bg-slate-100/60 dark:bg-slate-800/60
            border border-slate-200 dark:border-slate-800
            text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500
            text-sm rounded-lg py-2.5 transition-all outline-none
            ${leftIcon ? 'pl-11' : 'px-3.5'}
            ${rightIcon ? 'pr-11' : 'px-3.5'}
            focus:bg-white dark:focus:bg-slate-900
            focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
            disabled:opacity-50 disabled:bg-slate-100 dark:disabled:bg-slate-800/40
            ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-500/10' : ''}
            ${className}
          `}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-error-600 dark:text-error-400 font-medium mt-0.5 animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
