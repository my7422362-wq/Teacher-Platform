import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/providers';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useDirection();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={cn(
        'flex items-center gap-1.5 text-sm font-medium text-[rgba(249,246,240,0.55)] hover:text-[#F9F6F0] transition-colors px-3 py-2 rounded-xl hover:bg-[#16342D] cursor-pointer',
        className
      )}
      aria-label={t('languageSwitcher.label')}
    >
      <Globe className="h-4 w-4" />
      {language === 'ar' ? t('languageSwitcher.en') : t('languageSwitcher.ar')}
    </button>
  );
}

