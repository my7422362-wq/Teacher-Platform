import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { SectionHeader } from './SectionHeader';
import { MissionCard } from './MissionCard';
import { FeatureCard } from './FeatureCard';
import { AchievementGrid } from './AchievementGrid';
import { Timeline } from './Timeline';
import { ABOUT_TEACHER_DATA } from './about.data';

interface AboutTeacherProps {
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

export function AboutTeacher({ className }: AboutTeacherProps) {
  const { t } = useTranslation();
  // Memoize features array to avoid re-creation
  const features = useMemo(() => ABOUT_TEACHER_DATA.features, []);

  return (
    <section
      id="about-teacher"
      className={cn(
        'relative overflow-hidden py-20 sm:py-24 lg:py-28',
        className
      )}
    >
      {/* Dark navy background */}
      <div className="absolute inset-0 bg-[#0F2520] -z-20" />

      {/* Gradient orbs */}
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-[#D4B59E]/20 blur-[120px] -z-10 animate-[orb-float_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/3 -left-32 w-[400px] h-[400px] rounded-full bg-[#C7A187]/15 blur-[100px] -z-10 animate-[orb-float-2_10s_ease-in-out_infinite]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[150px] -z-10" />

      {/* Top-right accent glow */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-[#D4B59E]/10 to-transparent rounded-full blur-[80px] -z-10" />

      {/* Glowing particles */}
      <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-blue-400/30 blur-[2px] animate-[particle-float_6s_ease-in-out_infinite] -z-10" />
      <div className="absolute top-[60%] right-[15%] w-3 h-3 rounded-full bg-purple-400/20 blur-[3px] animate-[particle-float_8s_ease-in-out_infinite_reverse] -z-10" />
      <div className="absolute top-[30%] right-[25%] w-1.5 h-1.5 rounded-full bg-blue-300/25 blur-[1px] animate-[particle-float_7s_ease-in-out_infinite] -z-10" />
      <div className="absolute bottom-[25%] left-[5%] w-2.5 h-2.5 rounded-full bg-purple-300/20 blur-[2px] animate-[particle-float_9s_ease-in-out_infinite_reverse] -z-10" />
      <div className="absolute top-[10%] left-[30%] w-1 h-1 rounded-full bg-blue-400/30 blur-[1px] animate-[particle-float_5s_ease-in-out_infinite] -z-10" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SectionHeader />

        {/* Main Content */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Left Side: Mission + Features */}
          <div className="space-y-6">
            {/* Mission Card */}
            <MissionCard />

            {/* Feature Cards */}
            <div className="space-y-4">
              {features.map((featureKey, index) => (
                <FeatureCard
                  key={featureKey}
                  text={t(featureKey)}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Right Side: Achievement Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          >
            <AchievementGrid />
          </motion.div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
          className="mt-16 sm:mt-20 lg:mt-24"
        >
          {/* Timeline Label */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C7A187]" />
              </span>
              <span className="text-sm font-medium text-[rgba(249,246,240,0.75)]">{t('about.journeyLabel')}</span>
            </span>
          </div>
          <Timeline />
        </motion.div>
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F2520] to-transparent -z-10" />
    </section>
  );
}

