import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface CardProps extends Omit<HTMLMotionProps<"div">, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  hoverEffect?: boolean;
  glass?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  children,
  className = '',
  hoverEffect = false,
  glass = false,
  ...props
}, ref) => {
  const baseStyle = glass
    ? 'glass-panel rounded-xl shadow-sm overflow-hidden'
    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden';
  
  return (
    <motion.div
      ref={ref}
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.15 } } : undefined}
      className={`${baseStyle} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = 'Card';

export const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-5 border-b border-slate-100 dark:border-slate-800/80 ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-5 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-4 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800/80 px-5 py-4 ${className}`}>
    {children}
  </div>
);
