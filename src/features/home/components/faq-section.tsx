/**
 * FAQSection - Frequently Asked Questions accordion
 *
 * Displays expandable FAQ items. Uses framer-motion for animated expand/collapse.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { FAQ_ITEMS, type FAQItem } from '@/features/home/data';

interface FAQSectionProps {
  items?: FAQItem[];
  className?: string;
}

function FAQAccordionItem({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between py-4 text-right text-sm font-medium text-foreground hover:text-primary transition-colors gap-4"
        aria-expanded={isOpen}
      >
        <span>{item.question}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' as const }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-muted-foreground leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection({ items = FAQ_ITEMS, className }: FAQSectionProps) {
  return (
    <section
      id="faq"
      className={cn('py-16 sm:py-20 lg:py-24', className)}
      dir="rtl"
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="inline-flex">
            الأسئلة الشائعة
          </Badge>
          <h2 className="text-heading font-bold text-foreground">
            هل لديك استفسار؟
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            إجابات لأكثر الأسئلة شيوعاً عن المنصة والدورات
          </p>
        </motion.div>

        {/* FAQ list */}
        <motion.div
          className="mx-auto max-w-2xl rounded-xl border bg-card px-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {items.map((item) => (
            <FAQAccordionItem key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

