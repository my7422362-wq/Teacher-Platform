import { Link } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageDropdown } from './LanguageDropdown';

export function NavbarActions() {
  const { t } = useTranslation();

  return (
    <div className="hidden md:flex items-center gap-3">
      <LanguageDropdown />

      <Link
        to="/login"
        className="flex items-center gap-1.5 text-sm font-medium text-[rgba(249,246,240,0.55)] hover:text-[#F9F6F0] transition-colors px-4 py-2 rounded-xl hover:bg-[#16342D]"
      >
        <LogIn className="h-4 w-4" />
        {t('nav.login')}
      </Link>

      <Link to="/register">
        <button className="bg-[#D4B59E] hover:bg-[#C7A187] text-[#0F2520] rounded-xl px-5 py-2 text-sm font-medium transition-all duration-300 cursor-pointer shadow-sm">
          <UserPlus className="h-4 w-4 ml-1 inline" />
          {t('nav.register')}
        </button>
      </Link>
    </div>
  );
}

