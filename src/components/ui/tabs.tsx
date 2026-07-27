import {
  forwardRef,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from 'react';
import type {
  ReactNode,
  HTMLAttributes,
  ButtonHTMLAttributes,
  KeyboardEvent,
} from 'react';
import { cn } from '@/lib/utils';

// Context to share active tab state
interface TabsContextType {
  value: string;
  onValueChange: (val: string) => void;
  orientation?: 'horizontal' | 'vertical';
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs sub-components must be used inside a Tabs component');
  }
  return context;
};

// Main Tabs Wrapper
export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (val: string) => void;
  orientation?: 'horizontal' | 'vertical';
  children: ReactNode;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      defaultValue,
      value: controlledValue,
      onValueChange,
      orientation = 'horizontal',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [localValue, setLocalValue] = useState(controlledValue || defaultValue || '');

    useEffect(() => {
      if (controlledValue !== undefined) {
        setLocalValue(controlledValue);
      }
    }, [controlledValue]);

    const handleValueChange = (val: string) => {
      setLocalValue(val);
      onValueChange?.(val);
    };

    return (
      <TabsContext.Provider value={{ value: localValue, onValueChange: handleValueChange, orientation }}>
        <div
          ref={ref}
          className={cn('flex flex-col gap-2', orientation === 'vertical' && 'flex-row', className)}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = 'Tabs';

// TabsList Container
export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    const { orientation } = useTabs();
    const listRef = useRef<HTMLDivElement>(null);

    const handleRef = (node: HTMLDivElement | null) => {
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
      (listRef as any).current = node;
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (!listRef.current) return;
      const triggers = Array.from(
        listRef.current.querySelectorAll('[role="tab"]:not([disabled])')
      ) as HTMLButtonElement[];
      
      const activeElement = document.activeElement as HTMLButtonElement;
      const activeIdx = triggers.indexOf(activeElement);
      if (activeIdx === -1) return;

      const isRTL = document.documentElement.dir === 'rtl' || document.body.dir === 'rtl';

      let nextIdx = activeIdx;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextIdx = isRTL ? activeIdx - 1 : activeIdx + 1;
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        nextIdx = isRTL ? activeIdx + 1 : activeIdx - 1;
      } else if (e.key === 'ArrowDown' && orientation === 'vertical') {
        e.preventDefault();
        nextIdx = activeIdx + 1;
      } else if (e.key === 'ArrowUp' && orientation === 'vertical') {
        e.preventDefault();
        nextIdx = activeIdx - 1;
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextIdx = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        nextIdx = triggers.length - 1;
      }

      if (nextIdx < 0) nextIdx = triggers.length - 1;
      if (nextIdx >= triggers.length) nextIdx = 0;

      triggers[nextIdx].focus();
      triggers[nextIdx].click();
    };

    return (
      <div
        ref={handleRef}
        role="tablist"
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
        className={cn(
          'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
          orientation === 'vertical' && 'h-auto flex-col items-stretch',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsList.displayName = 'TabsList';

// TabsTrigger Button
export interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, disabled, ...props }, ref) => {
    const { value: activeValue, onValueChange } = useTabs();
    const isSelected = activeValue === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isSelected}
        disabled={disabled}
        onClick={() => !disabled && onValueChange(value)}
        tabIndex={isSelected ? 0 : -1}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          isSelected && 'bg-background text-foreground shadow-sm',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = 'TabsTrigger';

// TabsContent Wrapper
export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: activeValue } = useTabs();
    const isSelected = activeValue === value;

    if (!isSelected) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        tabIndex={0}
        className={cn(
          'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsContent.displayName = 'TabsContent';
