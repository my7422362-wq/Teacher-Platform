import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Logo() {
  const { t } = useTranslation();

  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#D4B59E] group-hover:bg-[#C7A187] transition-colors">
        <GraduationCap className="h-5 w-5 text-[#0F2520]" />
      </div>
      <span className="font-bold text-lg text-[#F9F6F0]">{t('common.brand')}</span>
    </Link>
  );
}

