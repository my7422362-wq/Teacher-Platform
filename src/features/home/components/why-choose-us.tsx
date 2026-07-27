/**
 * WhyChooseUs - Benefits and features section
 *
 * Displays a grid of reasons why students should choose this platform.
 * Uses framer-motion for staggered card reveal.
 */

import { motion } from 'framer-motion';
import { GraduationCap, Users, Award, Clock, BookOpen, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { WHY_CHOOSE_US } from '@/features/home/data';
import type { LucideIcon } from 'lucide-react';

interface WhyChooseUsProps {
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  'graduation-cap': GraduationCap,
  'users': Users,
  'certificate': Award,
  'clock': Clock,
  'book-open': BookOpen,
  'trending-up': TrendingUp,
};

export function WhyChooseUs({ className }: WhyChooseUsProps) {
  return (
    <section
      id="why-choose-us"
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
            لماذا نحن
          </Badge>
          <h2 className="text-heading font-bold text-foreground">
            لماذا تختار منصتنا؟
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            نقدم لك تجربة تعليمية متكاملة تجمع بين الجودة والمرونة
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, index) => {
            const Icon = iconMap[item.icon] || GraduationCap;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full transition-shadow duration-200 hover:shadow-md">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

