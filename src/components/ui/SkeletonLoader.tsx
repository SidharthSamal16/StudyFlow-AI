import React from 'react';

export interface SkeletonLoaderProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'rectangular',
  width,
  height,
  className = ''
}) => {
  const styles: React.CSSProperties = {
    width: width,
    height: height,
  };

  const variantClasses = {
    text: 'h-4 w-3/4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  };

  return (
    <div
      style={styles}
      className={`
        animate-pulse-subtle bg-slate-200 dark:bg-slate-800/80
        ${variantClasses[variant]}
        ${className}
      `}
    />
  );
};
