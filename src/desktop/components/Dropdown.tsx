import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export interface DropdownOption {
  value: string;
  label: string;
  sublabel?: string;
  lang?: string;
}

export interface DropdownProps {
  label?: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  ariaLabel?: string;
  className?: string;
  menuAlign?: 'left' | 'right';
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  onChange,
  ariaLabel = 'Select option',
  className,
  menuAlign = 'right',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption =
    options.find((opt) => opt.value === value) ?? options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const chevronClass = cn(
    'w-3.5 h-3.5 text-muted-text transition-transform duration-fast shrink-0',
    isOpen && 'rotate-180 text-forest-green'
  );

  return (
    <div ref={containerRef} className={cn('relative inline-block text-left', className)}>
      {label && (
        <span className="block text-utility text-muted-text mb-1 font-semibold">
          {label}
        </span>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        className="glass-style-d px-3.5 py-2 rounded-pill text-[13px] font-semibold text-charcoal inline-flex items-center justify-between gap-2 min-w-[128px] hover:border-forest-green/50"
      >
        <span
          lang={selectedOption?.lang}
          className={cn(
            'truncate',
            selectedOption?.lang === 'gu' && 'font-gujarati'
          )}
        >
          {selectedOption?.label}
        </span>
        <ChevronDown className={chevronClass} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            role="listbox"
            aria-label={ariaLabel}
            className={cn(
              'glass-style-d absolute mt-2 w-52 rounded-glass-sm p-1.5 z-50 border border-warm-border shadow-glass-hover',
              menuAlign === 'right' ? 'right-0' : 'left-0'
            )}
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  className="first:mt-0 mt-1"
                >
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      'w-full px-3 py-2 rounded-lg text-left text-[13px] flex items-center justify-between gap-2 transition-colors duration-fast',
                      isSelected
                        ? 'bg-forest-green text-warm-ivory font-semibold'
                        : 'text-charcoal hover:bg-sage-green/70 font-medium'
                    )}
                  >
                    <div className="min-w-0">
                      <span
                        lang={option.lang}
                        className={cn(
                          'block truncate',
                          option.lang === 'gu' && 'font-gujarati'
                        )}
                      >
                        {option.label}
                      </span>
                      {option.sublabel && (
                        <span
                          className={cn(
                            'block text-[11px] truncate',
                            isSelected ? 'text-warm-ivory/80' : 'text-muted-text'
                          )}
                        >
                          {option.sublabel}
                        </span>
                      )}
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
