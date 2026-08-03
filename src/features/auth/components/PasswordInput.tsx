import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Input, type InputProps } from '@/components/ui';

const PasswordInput = forwardRef<HTMLInputElement, Omit<InputProps, 'type' | 'endAdornment'>>(
  (props, ref) => {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);

    return (
      <Input
        ref={ref}
        type={visible ? 'text' : 'password'}
        endAdornment={
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setVisible((prev) => !prev)}
            className="text-[rgba(249,246,240,0.45)] hover:text-[#D4B59E] transition-colors"
            aria-label={visible ? t('auth.hidePassword') : t('auth.showPassword')}
          >
            {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
        {...props}
      />
    );
  }
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
