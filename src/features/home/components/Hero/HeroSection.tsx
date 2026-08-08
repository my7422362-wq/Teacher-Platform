import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { HeroContent } from './HeroContent';
import { HeroImage } from './HeroImage';
import { HeroStats } from './HeroStats';

interface HeroSectionProps {
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className={cn(
        'relative min-h-screen overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20',
        className
      )}
     
    >
      {/* Dark emerald background */}
      <div className="absolute inset-0 bg-[#0F2520] -z-20" />

      {/* Emerald/champagne gradient orbs */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-[rgba(212,181,158,0.08)] blur-[120px] -z-10 animate-[float-slow_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] rounded-full bg-[rgba(212,181,158,0.05)] blur-[100px] -z-10 animate-[float-slow_10s_ease-in-out_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[rgba(212,181,158,0.03)] blur-[150px] -z-10" />

      {/* Top-right accent glow */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-[rgba(212,181,158,0.06)] to-transparent rounded-full blur-[80px] -z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column: Text Content */}
          <HeroContent />

          {/* Right Column: Image + Floating Cards */}
          <HeroImage />
        </motion.div>
      </div>

      {/* Stats marquee - full page width, edge to edge */}
      <div className="relative z-10 mt-10 md:mt-14 w-full">
        <HeroStats />
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F2520] to-transparent -z-10" />
    </section>
  );
}

