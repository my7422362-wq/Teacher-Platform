import { forwardRef, useState, useEffect, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
      placeholder,
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
    const { t } = useTranslation();
    const resolvedPlaceholder = placeholder ?? t('common.selectPlaceholder');
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
      <div className={cn('relative w-full text-start', className)} ref={containerRef}>
        {label && (
          <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-[#F9F6F0]">
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
          <option value="">{resolvedPlaceholder}</option>
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
            'flex h-9 w-full items-center justify-between rounded-xl border border-[rgba(212,181,158,0.18)] bg-[#16342D] px-3 py-1 text-sm text-[#F9F6F0] shadow-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4B59E] disabled:cursor-not-allowed disabled:opacity-50 text-start',
            isOpen && 'ring-1 ring-[#D4B59E] border-[#D4B59E]',
            error && 'border-destructive focus-visible:ring-destructive',
            !selectedValue && 'text-[rgba(249,246,240,0.45)]'
          )}
          {...props}
        >
          <span className="truncate">{selectedOption ? selectedOption.label : resolvedPlaceholder}</span>
          <ChevronDown
            className={cn(
              'h-4 w-4 shrink-0 text-[rgba(249,246,240,0.45)] transition-transform duration-200',
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
              className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-[rgba(212,181,158,0.18)] bg-[#21483F] p-1 shadow-elevated focus:outline-none"
              role="listbox"
              aria-label={label || resolvedPlaceholder}
            >
              {options.length === 0 ? (
                <div className="py-2 px-3 text-sm text-[rgba(249,246,240,0.55)] text-center">{t('common.noOptions')}</div>
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
                        'relative flex w-full cursor-pointer select-none items-center rounded-lg py-1.5 ps-2 pe-8 text-sm outline-none transition-colors text-start',
                        isFocused && 'bg-[#1B4038] text-[#F9F6F0]',
                        option.disabled && 'pointer-events-none opacity-50',
                        isSelected && 'font-medium text-[#D4B59E]'
                      )}
                    >
                      <span className="absolute end-2 flex h-3.5 w-3.5 items-center justify-center">
                        {isSelected && <Check className="h-4 w-4 text-[#D4B59E]" />}
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

