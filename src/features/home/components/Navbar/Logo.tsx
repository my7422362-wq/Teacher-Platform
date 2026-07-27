import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-40 group-hover:opacity-70 blur-sm transition-opacity duration-300" />
        <GraduationCap className="relative h-7 w-7 text-blue-400 group-hover:text-blue-300 transition-colors" />
      </div>
      <span className="font-bold text-lg text-white">منصة التعلم</span>
    </Link>
  );
}

