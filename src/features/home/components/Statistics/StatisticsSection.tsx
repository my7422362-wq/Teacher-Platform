/**
 * StatisticsSection - Premium statistics section
 *
 * Features a dark navy background with gradient orbs,
 * glassmorphism cards, animated counters, and scroll-triggered animations.
 */

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { STATISTICS_DATA } from './statistics.data';
import { StatisticCard } from './StatisticCard';

interface StatisticsSectionProps {
  className?: string;
}

const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const headerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export function StatisticsSection({ className }: StatisticsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="statistics"
      className={cn(
        'relative overflow-hidden py-24 md:py-32',
        className
      )}
      dir="rtl"
      ref={ref}
    >
      {/* Dark background - seamless from Hero */}
      <div className="absolute inset-0 bg-[#0F2520] -z-20" />

      {/* Gradient orbs - matching Hero section style */}
      <div className="absolute top-1/3 -right-24 w-[400px] h-[400px] rounded-full bg-[#D4B59E]/15 blur-[120px] -z-10 animate-[orb-float_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/3 -left-24 w-[350px] h-[350px] rounded-full bg-[#C7A187]/10 blur-[100px] -z-10 animate-[orb-float-2_10s_ease-in-out_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[150px] -z-10" />

      {/* Tiny glowing dots decoration */}
      <div className="absolute top-20 left-[10%] w-1.5 h-1.5 rounded-full bg-blue-400/40 blur-[1px] -z-10 animate-pulse" />
      <div className="absolute top-40 right-[15%] w-1 h-1 rounded-full bg-purple-400/30 blur-[1px] -z-10 animate-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-32 left-[20%] w-1.5 h-1.5 rounded-full bg-blue-400/30 blur-[1px] -z-10 animate-pulse" style={{ animationDelay: '0.8s' }} />
      <div className="absolute bottom-48 right-[25%] w-1 h-1 rounded-full bg-purple-400/25 blur-[1px] -z-10 animate-pulse" style={{ animationDelay: '2.2s' }} />
      <div className="absolute top-1/3 left-[40%] w-1 h-1 rounded-full bg-blue-300/20 blur-[1px] -z-10 animate-pulse" style={{ animationDelay: '1.2s' }} />

      {/* Floating particles */}
      <div className="absolute top-1/4 right-[30%] w-2 h-2 rounded-full bg-[#D4B59E]/10 blur-sm -z-10 animate-float" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-1/4 left-[35%] w-2.5 h-2.5 rounded-full bg-[#C7A187]/10 blur-sm -z-10 animate-float" style={{ animationDuration: '8s', animationDelay: '1s' }} />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-20"
        >
          {/* Badge */}
          <motion.div
            variants={headerItem}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4B59E]" />
            </span>
            <span className="text-sm font-medium text-[rgba(249,246,240,0.75)]">
              إنجازاتنا
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={headerItem}
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
          >
            <span className="text-white">أرقام تعكس ثقة </span>
            <span className="bg-gradient-to-r from-[#D4B59E] via-[#C7A187] to-[#D4B59E] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
              آلاف الطلاب
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={headerItem}
            className="mt-5 text-base sm:text-lg text-[rgba(249,246,240,0.55)] leading-relaxed max-w-xl mx-auto"
          >
            نفخر بتحقيق نتائج مميزة من خلال تقديم محتوى تعليمي احترافي وتجربة تعلم متكاملة.
          </motion.p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATISTICS_DATA.map((stat, index) => (
            <StatisticCard
              key={stat.title}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              title={stat.title}
              description={stat.description}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Top fade gradient from Hero */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0F2520] to-transparent -z-10" />

      {/* Bottom fade gradient to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F2520] to-transparent -z-10" />
    </section>
  );
}

