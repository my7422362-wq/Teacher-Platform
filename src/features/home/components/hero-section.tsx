/**
 * HeroSection - Premium dark futuristic hero with RTL split layout
 *
 * Left side: text content, CTA buttons, statistics card.
 * Right side: teacher portrait with glowing effects and floating cards.
 * Uses Framer Motion for staggered entrance animations.
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Play,
  GraduationCap,
  Lightbulb,
  TrendingUp,
  Award,
  Star,
  BookOpen,
  Users,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  HERO_CONTENT,
  HERO_FLOATING_CARDS,
  HERO_STATISTICS,
} from '@/features/home/data';

interface HeroSectionProps {
  className?: string;
}

// ─── Variants ──────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const itemFadeLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const itemFadeRight = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const cardStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.5 },
  },
};

const cardItem = {
  hidden: { opacity: 0, x: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const statItem = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

// ─── Floating Card Icon Resolver ──────────────────────
function getCardIcon(iconName: string) {
  switch (iconName) {
    case 'Lightbulb':
      return <Lightbulb className="h-4 w-4 text-yellow-400" />;
    case 'TrendingUp':
      return <TrendingUp className="h-4 w-4 text-green-400" />;
    case 'Award':
      return <Award className="h-4 w-4 text-[#D4B59E]" />;
    default:
      return <Star className="h-4 w-4 text-[#D4B59E]" />;
  }
}

// ─── Component ─────────────────────────────────────────
export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className={cn(
        'relative min-h-screen overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20',
        className
      )}
      dir="rtl"
    >
      {/* ── Background Elements ──────────────────────── */}
      <div className="absolute inset-0 bg-[#0F2520] -z-20" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 -z-15 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-[#D4B59E]/20 blur-[120px] -z-10 animate-[orb-float_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] rounded-full bg-[#C7A187]/15 blur-[100px] -z-10 animate-[orb-float-2_10s_ease-in-out_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[150px] -z-10" />

      {/* Top-right accent glow */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-[#D4B59E]/10 to-transparent rounded-full blur-[80px] -z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ═══ Left Column: Text Content ═══════════════ */}
          <div className="relative z-10 order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              variants={itemFadeUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
            >
              <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium text-[rgba(249,246,240,0.75)]">
                {HERO_CONTENT.badge}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemFadeUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="text-white">{HERO_CONTENT.titleLine1}</span>
              <br />
              <span className="bg-gradient-to-r from-[#D4B59E] via-[#C7A187] to-[#D4B59E] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
                {HERO_CONTENT.titleLine2}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemFadeUp}
              className="mt-6 text-base sm:text-lg text-[rgba(249,246,240,0.55)] leading-relaxed max-w-xl"
            >
              {HERO_CONTENT.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemFadeUp}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link to="/register">
                <Button className="relative group overflow-hidden bg-gradient-to-r from-[#D4B59E] to-[#C7A187] hover:from-[#D4B59E] hover:to-[#D4B59E] text-white border-0 rounded-xl px-8 py-6 text-base font-semibold shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 transition-all duration-300">
                  <span className="relative z-10 flex items-center gap-2">
                    {HERO_CONTENT.primaryCta}
                    <ArrowLeft className="h-4 w-4 group-hover:translate-x-[-4px] transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 rounded-xl" />
                </Button>
              </Link>

              <Link to="/courses">
                <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-xl px-8 py-6 text-base font-semibold backdrop-blur-sm transition-all duration-300 group">
                  <Play className="h-4 w-4 ml-1 group-hover:scale-110 transition-transform" />
                  {HERO_CONTENT.secondaryCta}
                </Button>
              </Link>
            </motion.div>

            {/* Statistics Card */}
            <motion.div
              variants={itemFadeUp}
              className="mt-10 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {HERO_STATISTICS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    custom={i}
                    variants={statItem}
                    className="text-center"
                  >
                    <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#D4B59E] to-[#D4B59E] bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ═══ Right Column: Image + Floating Cards ═══ */}
          <div className="relative order-1 lg:order-2 flex items-center justify-center min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
            {/* Main glowing circle behind image */}
            <div className="absolute w-[320px] h-[320px] md:w-[400px] md:h-[400px] lg:w-[480px] lg:h-[480px] rounded-full bg-gradient-to-br from-[#D4B59E]/30 via-purple-500/20 to-blue-600/10 blur-[2px] animate-[glow-pulse_4s_ease-in-out_infinite]" />

            {/* Secondary glow ring */}
            <div className="absolute w-[280px] h-[280px] md:w-[350px] md:h-[350px] lg:w-[420px] lg:h-[420px] rounded-full border border-blue-400/20 animate-[float_6s_ease-in-out_infinite]" />

            {/* Teacher image placeholder */}
            <motion.div
              variants={itemFadeLeft}
              className="relative z-10 w-[220px] h-[220px] md:w-[280px] md:h-[280px] lg:w-[340px] lg:h-[340px] rounded-full overflow-hidden border-2 border-white/10 shadow-2xl shadow-blue-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4B59E]/40 to-[#C7A187]/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <GraduationCap className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 text-white/80" />
              </div>
              {/* Decorative dots around image */}
              <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-blue-400/60" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-purple-400/60" />
              <div className="absolute top-1/2 -right-3 w-3 h-3 rounded-full bg-blue-300/40" />
              <div className="absolute top-1/3 -left-3 w-3 h-3 rounded-full bg-purple-300/40" />
            </motion.div>

            {/* Floating Cards */}
            <motion.div
              variants={cardStagger}
              className="absolute inset-0"
            >
              {/* Card 1 - Top left */}
              <motion.div
                variants={cardItem}
                className="absolute top-[5%] left-[5%] md:left-[10%] lg:left-[5%] flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg animate-[float-slow_5s_ease-in-out_infinite]"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#D4B59E]/20">
                  {getCardIcon(HERO_FLOATING_CARDS[0].icon)}
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-200 whitespace-nowrap">
                  {HERO_FLOATING_CARDS[0].text}
                </span>
              </motion.div>

              {/* Card 2 - Right middle */}
              <motion.div
                variants={cardItem}
                className="absolute top-[40%] -right-[5%] md:right-[0%] lg:-right-[5%] flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg animate-[float-slow_6s_ease-in-out_infinite]"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/20">
                  {getCardIcon(HERO_FLOATING_CARDS[1].icon)}
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-200 whitespace-nowrap">
                  {HERO_FLOATING_CARDS[1].text}
                </span>
              </motion.div>

              {/* Card 3 - Bottom left */}
              <motion.div
                variants={cardItem}
                className="absolute bottom-[10%] left-[10%] md:left-[15%] lg:left-[10%] flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg animate-[float-slow_7s_ease-in-out_infinite]"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#C7A187]/20">
                  {getCardIcon(HERO_FLOATING_CARDS[2].icon)}
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-200 whitespace-nowrap">
                  {HERO_FLOATING_CARDS[2].text}
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F2520] to-transparent -z-10" />
    </section>
  );
}

