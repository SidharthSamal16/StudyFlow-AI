import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  align = 'right'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const alignmentClasses = align === 'left' ? 'left-0 origin-top-left' : 'right-0 origin-top-right';

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`
              absolute ${alignmentClasses} mt-2 w-56 rounded-xl bg-white dark:bg-slate-900 
              border border-slate-200 dark:border-slate-800 shadow-xl 
              focus:outline-none z-50 p-1.5
            `}
          >
            <div className="flex flex-col gap-0.5">
              {items.map((item) => (
                <button
                  key={item.id}
                  disabled={item.disabled}
                  onClick={() => {
                    item.onClick();
                    setIsOpen(false);
                  }}
                  className={`
                    w-full text-left px-3 py-2 text-sm rounded-lg flex items-center gap-2.5
                    transition-all font-medium disabled:opacity-40 disabled:pointer-events-none
                    text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80
                    hover:text-slate-950 dark:hover:text-white
                  `}
                >
                  {item.icon && <span className="text-slate-400 dark:text-slate-500">{item.icon}</span>}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
