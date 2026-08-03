import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export function OtpInput({ length = 6, value, onChange, onComplete, error, disabled }: OtpInputProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? '');

  const setDigit = (index: number, digit: string) => {
    const next = digits.slice();
    next[index] = digit;
    const nextValue = next.join('');
    onChange(nextValue);
    if (nextValue.length === length && !next.includes('')) {
      onComplete?.(nextValue);
    }
  };

  const handleChange = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, '').slice(-1);
    setDigit(index, digit);
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!pasted) return;
    e.preventDefault();
    onChange(pasted.padEnd(length, ''));
    if (pasted.length === length) {
      onComplete?.(pasted);
      inputRefs.current[length - 1]?.focus();
    } else {
      inputRefs.current[pasted.length]?.focus();
    }
  };

  return (
    <div className="w-full">
      <div dir="ltr" className="flex items-center justify-center gap-2 sm:gap-3">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={digit}
            disabled={disabled}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            className={cn(
              'h-12 w-10 sm:h-14 sm:w-12 rounded-xl border bg-[#16342D] text-center text-lg font-semibold text-[#F9F6F0] shadow-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4B59E] focus-visible:border-[#D4B59E] disabled:cursor-not-allowed disabled:opacity-50',
              error ? 'border-destructive' : 'border-[rgba(212,181,158,0.18)]'
            )}
          />
        ))}
      </div>
      {error && <p className="mt-2 text-center text-sm text-destructive">{error}</p>}
    </div>
  );
}
