import { forwardRef, useState, useEffect, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  className?: string;
  name?: string;
  id?: string;
}

const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder = 'اختر خياراً...',
      disabled = false,
      error,
      label,
      className,
      name,
      id,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(controlledValue || defaultValue || '');
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    // Sync with controlled value changes
    useEffect(() => {
      if (controlledValue !== undefined) {
        setSelectedValue(controlledValue);
      }
    }, [controlledValue]);

    // Handle clicks outside container to close dropdown
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find((opt) => opt.value === selectedValue);

    const handleSelect = (val: string) => {
      const option = options.find((opt) => opt.value === val);
      if (option?.disabled) return;

      setSelectedValue(val);
      setIsOpen(false);
      onChange?.(val);
      triggerRef.current?.focus();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement | HTMLDivElement>) => {
      if (disabled) return;

      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          const currentIdx = options.findIndex((opt) => opt.value === selectedValue);
          setFocusedIndex(currentIdx >= 0 ? currentIdx : 0);
        } else if (focusedIndex >= 0 && focusedIndex < options.length) {
          handleSelect(options[focusedIndex].value);
        }
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) => {
            let next = prev + 1;
            while (next < options.length && options[next].disabled) {
              next++;
            }
            return next < options.length ? next : prev;
          });
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(options.length - 1);
        } else {
          setFocusedIndex((prev) => {
            let next = prev - 1;
            while (next >= 0 && options[next].disabled) {
              next--;
            }
            return next >= 0 ? next : prev;
          });
        }
      } else if (e.key === 'Tab') {
        setIsOpen(false);
      }
    };

    return (
      <div className={cn('relative w-full text-right', className)} ref={containerRef} dir="rtl">
        {label && (
          <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
            {label}
          </label>
        )}

        {/* Hidden select for form integrity */}
        <select
          name={name}
          value={selectedValue}
          onChange={(e) => handleSelect(e.target.value)}
          disabled={disabled}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>

        <button
          ref={ref || triggerRef}
          type="button"
          id={id}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-invalid={!!error}
          onKeyDown={handleKeyDown}
          onClick={() => {
            if (!disabled) {
              setIsOpen(!isOpen);
              const currentIdx = options.findIndex((opt) => opt.value === selectedValue);
              setFocusedIndex(currentIdx >= 0 ? currentIdx : 0);
            }
          }}
          className={cn(
            'flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-start',
            isOpen && 'ring-1 ring-ring border-ring',
            error && 'border-destructive focus-visible:ring-destructive',
            !selectedValue && 'text-muted-foreground'
          )}
          {...props}
        >
          <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
          <ChevronDown
            className={cn(
              'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.12, ease: 'easeOut' }}
              className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md focus:outline-none"
              role="listbox"
              aria-label={label || placeholder}
            >
              {options.length === 0 ? (
                <div className="py-2 px-3 text-sm text-muted-foreground text-center">لا توجد خيارات</div>
              ) : (
                options.map((option, idx) => {
                  const isSelected = option.value === selectedValue;
                  const isFocused = idx === focusedIndex;

                  return (
                    <div
                      key={option.value}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={option.disabled}
                      onClick={() => handleSelect(option.value)}
                      onMouseEnter={() => !option.disabled && setFocusedIndex(idx)}
                      className={cn(
                        'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 ps-2 pe-8 text-sm outline-none transition-colors text-start',
                        isFocused && 'bg-accent text-accent-foreground',
                        option.disabled && 'pointer-events-none opacity-50',
                        isSelected && 'font-medium'
                      )}
                    >
                      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                        {isSelected && <Check className="h-4 w-4" />}
                      </span>
                      <span className="truncate">{option.label}</span>
                    </div>
                  );
                })
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };
