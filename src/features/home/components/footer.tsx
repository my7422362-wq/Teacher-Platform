/**
 * Footer - Landing page footer
 *
 * Multi-column footer with brand info, quick links, support links, and social links.
 * Uses framer-motion for subtle entrance animation.
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { FOOTER_CONTENT } from '@/features/home/data';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const { t } = useTranslation();

  return (
    <footer
      className={cn('border-t border-border/40 bg-muted/30 py-12', className)}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {/* Brand column */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-lg text-foreground">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span>{t(FOOTER_CONTENT.brandNameKey)}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t(FOOTER_CONTENT.descriptionKey)}
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">{t('footer.quickLinksTitle')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {FOOTER_CONTENT.quickLinks.map((link) => (
                <li key={link.labelKey}>
                  <Link
                    to={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">{t('footer.supportTitle')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {FOOTER_CONTENT.supportLinks.map((link) => (
                <li key={link.labelKey}>
                  <Link
                    to={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">{t('footer.followTitle')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {FOOTER_CONTENT.socialLinks.map((link) => (
                <li key={link.labelKey}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Copyright bar */}
        <div className="border-t border-border/30 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {t(FOOTER_CONTENT.brandNameKey)}. {t(FOOTER_CONTENT.copyrightKey)}
        </div>
      </div>
    </footer>
  );
}

