import { BookText } from 'lucide-react';
import { cn } from '@/lib/utils';

const GRADIENTS = [
  'from-[#D4B59E]/40 via-purple-600/30 to-indigo-900/40',
  'from-emerald-600/40 via-teal-600/30 to-cyan-900/40',
  'from-amber-600/40 via-orange-600/30 to-red-900/40',
];

interface BlogCoverProps {
  id: number;
  className?: string;
}

/** Deterministic gradient placeholder — same approach as course cards, no stock/fake photos. */
export function BlogCover({ id, className }: BlogCoverProps) {
  const gradient = GRADIENTS[(id - 1) % GRADIENTS.length];

  return (
    <div className={cn('relative w-full overflow-hidden bg-gradient-to-br', gradient, className)}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-16 h-16 border border-white/10 rounded-full" />
        <div className="absolute bottom-4 left-4 w-24 h-24 border border-white/5 rounded-full" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <BookText className="w-7 h-7 text-white/70" />
        </div>
      </div>
    </div>
  );
}
