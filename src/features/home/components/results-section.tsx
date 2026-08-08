/**
 * ResultsSection - Real outcome numbers, prominently framed
 *
 * Deliberately reuses the same real figures already used in the Hero
 * marquee and About achievements (no fabricated student results/screenshots
 * — we don't have any to show yet), just presented as a dedicated,
 * higher-visibility "results" showcase.
 */

import { motion } from 'framer-motion';
import { Award, Users, BookOpenCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ResultsSectionProps {
  className?: string;
}

const RESULT_ITEMS = [
  { icon: Award, valueKey: 'about.achievements.Star.value', labelKey: 'results.items.successRate' },
  { icon: Users, valueKey: 'about.achievements.Users.value', labelKey: 'results.items.students' },
  { icon: BookOpenCheck, valueKey: 'about.achievements.BookOpen.value', labelKey: 'results.items.lessons' },
] as const;

export function ResultsSection({ className }: ResultsSectionProps) {
  const { t } = useTranslation();

  return (
    <section className={cn('py-16 sm:py-20 lg:py-24', className)}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="inline-flex">
            {t('results.badge')}
          </Badge>
          <h2 className="text-heading font-bold text-foreground">{t('results.title')}</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">{t('results.description')}</p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          {RESULT_ITEMS.map(({ icon: Icon, valueKey, labelKey }, i) => (
            <motion.div
              key={labelKey}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center gap-3 rounded-2xl border bg-card px-6 py-10 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-7 w-7" />
              </span>
              <span className="text-4xl font-extrabold text-primary">{t(valueKey)}</span>
              <span className="text-sm text-muted-foreground">{t(labelKey)}</span>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">{t('results.disclaimer')}</p>
      </div>
    </section>
  );
}
