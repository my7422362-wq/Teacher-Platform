/**
 * ContactSection - Real contact details
 *
 * Shows working email/WhatsApp links. Deliberately not a contact form —
 * there's no backend endpoint to receive submissions yet, and a form that
 * silently goes nowhere would be worse than no form at all.
 */

import { motion } from 'framer-motion';
import { Mail, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { CONTACT_CONTENT } from '@/features/home/data';

interface ContactSectionProps {
  className?: string;
}

export function ContactSection({ className }: ContactSectionProps) {
  const { t } = useTranslation();

  return (
    <section id="contact" className={cn('py-16 sm:py-20 lg:py-24', className)}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="inline-flex">
            {t(CONTACT_CONTENT.badgeKey)}
          </Badge>
          <h2 className="text-heading font-bold text-foreground">
            {t(CONTACT_CONTENT.titleKey)}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t(CONTACT_CONTENT.descriptionKey)}
          </p>
        </motion.div>

        <motion.div
          className="mx-auto grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <a
            href={`mailto:${CONTACT_CONTENT.email}`}
            className="flex items-center gap-4 rounded-xl border bg-card px-5 py-4 transition-colors hover:border-primary"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Mail className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm text-muted-foreground">
                {t(CONTACT_CONTENT.emailLabelKey)}
              </span>
              <span className="block truncate font-medium text-foreground" dir="ltr">
                {CONTACT_CONTENT.email}
              </span>
            </span>
          </a>

          <a
            href={CONTACT_CONTENT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xl border bg-card px-5 py-4 transition-colors hover:border-primary"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MessageCircle className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm text-muted-foreground">
                {t(CONTACT_CONTENT.phoneLabelKey)}
              </span>
              <span className="block truncate font-medium text-foreground" dir="ltr">
                {CONTACT_CONTENT.phone}
              </span>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
