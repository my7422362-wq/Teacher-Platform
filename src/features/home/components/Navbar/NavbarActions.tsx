import { Link } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';

export function NavbarActions() {
  return (
    <div className="hidden md:flex items-center gap-3">
      <Link
        to="/login"
        className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
      >
        <LogIn className="h-4 w-4" />
        تسجيل الدخول
      </Link>

      <Link to="/register">
        <button className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 rounded-xl px-5 py-2 text-sm font-medium shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 transition-all duration-300 cursor-pointer">
          <UserPlus className="h-4 w-4 ml-1 inline" />
          إنشاء حساب
        </button>
      </Link>
    </div>
  );
}

