/**
 * ResultsSection - Real, live platform numbers (students, courses,
 * teachers), derived from the public course catalog — no fabricated
 * success-rate or made-up figures.
 */

import { motion } from 'framer-motion';
import { Users, BookOpenCheck, GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { usePlatformStats } from '@/features/home/lib/platform-stats';

interface ResultsSectionProps {
  className?: string;
}

export function ResultsSection({ className }: ResultsSectionProps) {
  const { t } = useTranslation();
  const stats = usePlatformStats();

  const items = [
    { icon: Users, value: stats.totalStudents, labelKey: 'results.items.students' },
    { icon: BookOpenCheck, value: stats.totalCourses, labelKey: 'results.items.courses' },
    { icon: GraduationCap, value: stats.totalTeachers, labelKey: 'results.items.teachers' },
  ];

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
          {items.map(({ icon: Icon, value, labelKey }, i) => (
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
              <span className="text-4xl font-extrabold text-primary">{value.toLocaleString()}+</span>
              <span className="text-sm text-muted-foreground">{t(labelKey)}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
