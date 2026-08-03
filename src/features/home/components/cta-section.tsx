/**
 * CTASection - Call-to-action banner section
 *
 * Displays a prominent CTA banner encouraging users to sign up.
 * Uses framer-motion for animation.
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CTA_CONTENT } from '@/features/home/data';

interface CTASectionProps {
  className?: string;
}

export function CTASection({ className }: CTASectionProps) {
  const { t } = useTranslation();

  return (
    <section className={cn('py-16 sm:py-20', className)}>
      <div className="container mx-auto px-4">
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 px-6 py-14 sm:px-12 sm:py-16 text-center text-primary-foreground shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-20 -left-20 h-48 w-48 rounded-full bg-primary-foreground/5" />
          <div className="absolute -bottom-16 -right-16 h-36 w-36 rounded-full bg-primary-foreground/5" />

          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {t(CTA_CONTENT.title)}
            </h2>
            <p className="mx-auto max-w-lg text-base sm:text-lg text-primary-foreground/85 leading-relaxed">
              {t(CTA_CONTENT.description)}
            </p>
            <div className="flex justify-center">
              <Link to="/register">
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2 text-base"
                >
                  {t(CTA_CONTENT.buttonText)}
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

