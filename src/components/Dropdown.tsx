import React, { useState, useRef, useEffect, useId } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  description?: string;
}

export interface DropdownProps {
  id?: string;
  label?: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  align?: 'left' | 'right';
  direction?: 'down' | 'up';
  size?: 'sm' | 'md';
  variant?: 'light' | 'dark';
  icon?: React.ReactNode;
  ariaLabel?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  id,
  label,
  value,
  options,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  error,
  className = '',
  align = 'left',
  direction = 'down',
  size = 'md',
  variant = 'light',
  icon,
  ariaLabel,
}) => {
  const generatedId = useId();
  const controlId = id || `dropdown-${generatedId}`;
  const listboxId = `${controlId}-listbox`;
  const labelId = `${controlId}-label`;

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedIndex = options.findIndex((opt) => opt.value === value);
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
    }
  }, [isOpen, selectedIndex]);

  useEffect(() => {
    if (isOpen && listRef.current && highlightedIndex >= 0) {
      const optionEl = listRef.current.children[highlightedIndex] as HTMLElement | undefined;
      optionEl?.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, highlightedIndex]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (isOpen && highlightedIndex >= 0 && options[highlightedIndex]) {
          handleSelect(options[highlightedIndex].value);
        } else {
          setIsOpen((prev) => !prev);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex((prev) => (prev + 1) % options.length);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length);
        }
        break;
      case 'Home':
        if (isOpen) {
          event.preventDefault();
          setHighlightedIndex(0);
        }
        break;
      case 'End':
        if (isOpen) {
          event.preventDefault();
          setHighlightedIndex(options.length - 1);
        }
        break;
      case 'Escape':
        if (isOpen) {
          event.preventDefault();
          setIsOpen(false);
          triggerRef.current?.focus();
        }
        break;
      case 'Tab':
        if (isOpen) {
          setIsOpen(false);
        }
        break;
      default:
        break;
    }
  };

  const isDark = variant === 'dark';

  const triggerClasses = isDark
    ? `bg-warm-ivory/10 text-warm-ivory border-warm-ivory/20 hover:bg-warm-ivory/15 hover:border-warm-ivory/35 focus-visible:ring-2 focus-visible:ring-saffron/50 focus-visible:border-saffron`
    : `bg-warm-ivory/95 text-charcoal border-warm-border hover:border-forest-green/60 focus-visible:ring-2 focus-visible:ring-forest-green/25 focus-visible:border-forest-green`;

  const activeTriggerClasses = isOpen
    ? isDark
      ? 'border-saffron ring-2 ring-saffron/35'
      : 'border-forest-green ring-2 ring-forest-green/20'
    : '';

  const sizeClasses =
    size === 'sm'
      ? 'px-3.5 py-2 text-xs sm:text-sm rounded-full'
      : 'px-4 py-3 text-sm sm:text-base rounded-xl';

  const menuPositionClasses =
    direction === 'up' ? 'bottom-full mb-2' : 'top-full mt-1.5';

  const menuAlignClasses = align === 'right' ? 'right-0' : 'left-0';

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {label && (
        <label
          id={labelId}
          htmlFor={controlId}
          className={`block text-sm font-semibold mb-1.5 ${
            isDark ? 'text-warm-ivory/90' : 'text-charcoal'
          }`}
        >
          {label}
        </label>
      )}

      <button
        ref={triggerRef}
        id={controlId}
        type="button"
        disabled={disabled}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-labelledby={label ? `${labelId} ${controlId}` : undefined}
        aria-label={!label ? ariaLabel || placeholder : undefined}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={`w-full flex items-center justify-between gap-2 border backdrop-blur-md transition-all duration-150 text-left outline-none ${sizeClasses} ${triggerClasses} ${activeTriggerClasses} ${
          error ? 'border-red-600 focus-visible:ring-red-500/25' : ''
        } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span className="flex items-center gap-2 min-w-0 truncate">
          {icon && <span className="shrink-0">{icon}</span>}
          <span
            className={`truncate ${
              selectedOption
                ? isDark
                  ? 'text-warm-ivory font-medium'
                  : 'text-charcoal font-medium'
                : isDark
                ? 'text-warm-ivory/60'
                : 'text-muted-text'
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
            isDark ? 'text-warm-ivory/75' : 'text-muted-text'
          } ${isOpen ? 'rotate-180 text-forest-green' : ''}`}
          aria-hidden="true"
        />
      </button>

      {error && (
        <p className="mt-1 text-xs text-red-600 font-medium" role="alert">
          {error}
        </p>
      )}

      {isOpen && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-labelledby={label ? labelId : controlId}
          tabIndex={-1}
          className={`absolute ${menuPositionClasses} ${menuAlignClasses} z-50 w-full min-w-[11rem] max-w-[calc(100vw-2rem)] max-h-60 overflow-y-auto rounded-2xl border p-1.5 shadow-dropdown backdrop-blur-xl transition-all ${
            isDark
              ? 'bg-charcoal/95 border-warm-ivory/20 text-warm-ivory'
              : 'bg-warm-ivory/95 border-warm-border text-charcoal'
          }`}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isHighlighted = index === highlightedIndex;

            return (
              <li
                key={option.value}
                id={`${controlId}-option-${index}`}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => handleSelect(option.value)}
                className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm cursor-pointer select-none transition-colors ${
                  isDark
                    ? isSelected
                      ? 'bg-forest-green text-warm-ivory font-semibold'
                      : isHighlighted
                      ? 'bg-warm-ivory/10 text-warm-ivory'
                      : 'text-warm-ivory/85'
                    : isSelected
                    ? 'bg-sage-green text-forest-green font-semibold'
                    : isHighlighted
                    ? 'bg-vanilla-cream text-charcoal'
                    : 'text-charcoal'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate">{option.label}</div>
                  {option.description && (
                    <div
                      className={`text-xs truncate mt-0.5 ${
                        isDark ? 'text-warm-ivory/65' : 'text-muted-text'
                      }`}
                    >
                      {option.description}
                    </div>
                  )}
                </div>
                {isSelected && (
                  <Check
                    className={`w-4 h-4 shrink-0 ${
                      isDark ? 'text-saffron' : 'text-forest-green'
                    }`}
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;