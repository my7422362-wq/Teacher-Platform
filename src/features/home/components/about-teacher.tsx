/**
 * AboutTeacher - Section about the single teacher
 *
 * Displays teacher image, name, title, bio, and key credentials.
 * Uses framer-motion for scroll-triggered animations.
 */

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ABOUT_TEACHER } from '@/features/home/data';

interface AboutTeacherProps {
  className?: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export function AboutTeacher({ className }: AboutTeacherProps) {
  const { t } = useTranslation();

  return (
    <section
      id="about-teacher"
      className={cn('py-16 sm:py-20 lg:py-24 bg-muted/30', className)}
      dir="rtl"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image column */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
          >
            <Avatar
              src={ABOUT_TEACHER.image}
              alt={ABOUT_TEACHER.name}
              fallback={ABOUT_TEACHER.name}
              size="xl"
              className="h-64 w-64 lg:h-80 lg:w-80 shadow-elevated ring-4 ring-border"
            />
          </motion.div>

          {/* Text column */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            <motion.div className="space-y-2" variants={fadeInUp}>
              <Badge variant="secondary">{t('about.badgeSecondary')}</Badge>
              <h2 className="text-heading font-bold text-foreground">
                {ABOUT_TEACHER.name}
              </h2>
              <p className="text-subtitle text-muted-foreground">
                {t(ABOUT_TEACHER.titleKey)}
              </p>
            </motion.div>

            <motion.p
              className="text-body text-muted-foreground leading-relaxed"
              variants={fadeInUp}
            >
              {t(ABOUT_TEACHER.teacherInfoKey)}
            </motion.p>

            {/* Credentials grid */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4"
              variants={fadeInUp}
            >
              {ABOUT_TEACHER.credentials.map((cred) => (
                <div
                  key={cred.labelKey}
                  className="rounded-xl border bg-card p-4 text-center shadow-sm"
                >
                  <p className="text-2xl font-bold text-primary">{t(cred.valueKey)}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t(cred.labelKey)}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
