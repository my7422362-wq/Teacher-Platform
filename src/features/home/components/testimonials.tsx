/**
 * Testimonials - Student testimonials section
 *
 * Displays student feedback in a responsive grid with star ratings.
 * Uses framer-motion for scroll-based reveal.
 */

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { EmptyState } from '@/components/ui/empty-state';
import { TESTIMONIALS, type TestimonialItem } from '@/features/home/data';

interface TestimonialsProps {
  items?: TestimonialItem[];
  className?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" dir="ltr">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'h-4 w-4',
            i < rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-muted text-muted-foreground/30'
          )}
        />
      ))}
    </div>
  );
}

export function Testimonials({ items = TESTIMONIALS, className }: TestimonialsProps) {
  if (!items.length) {
    return (
      <section className={cn('py-16 sm:py-20 lg:py-24', className)} dir="rtl">
        <div className="container mx-auto px-4">
          <EmptyState
            title="لا توجد آراء بعد"
            description="كن أول من يشاركنا رأيه عن الدورات!"
          />
        </div>
      </section>
    );
  }

  return (
    <section
      id="testimonials"
      className={cn('py-16 sm:py-20 lg:py-24 bg-muted/30', className)}
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
            آراء الطلاب
          </Badge>
          <h2 className="text-heading font-bold text-foreground">
            ماذا يقول طلابنا؟
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            استمع لتجارب طلابنا الذين التحقوا بالدورات
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Avatar
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fallback={testimonial.name}
                    size="md"
                  />
                  <div className="space-y-0.5">
                    <p className="font-semibold text-sm text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.title}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <StarRating rating={testimonial.rating} />
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

