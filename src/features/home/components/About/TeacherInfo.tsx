import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ABOUT_TEACHER_DATA } from './about.data';

const itemFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

export function TeacherInfo() {
  const { t } = useTranslation();

  return (
    <motion.div
      className="relative z-10 space-y-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* Badge */}
      <motion.div
        variants={itemFadeUp}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4B59E]" />
        </span>
        <span className="text-sm font-medium text-[rgba(249,246,240,0.75)]">
          {t(ABOUT_TEACHER_DATA.titleKey)}
        </span>
      </motion.div>

      {/* Main description */}
      <motion.p
        variants={itemFadeUp}
        className="text-base sm:text-lg text-[rgba(249,246,240,0.55)] leading-relaxed max-w-xl"
      >
        {t(ABOUT_TEACHER_DATA.descriptionKey)}
      </motion.p>

      {/* Teacher bio glassmorphism card */}
      <motion.div
        variants={itemFadeUp}
        className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-lg hover:border-white/20 transition-all duration-300"
      >
        {/* Top accent gradient line */}
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#C7A187]/50 to-transparent" />

        <div className="flex items-start gap-4">
          {/* Quote icon */}
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#D4B59E]/20 to-[#D4B59E]/20 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-[#D4B59E]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.404-.655-2.917-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.166 21 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.404-.655-2.917-1.179z" />
            </svg>
          </div>

          <p className="text-[rgba(249,246,240,0.75)] leading-relaxed text-sm sm:text-base">
            {t(ABOUT_TEACHER_DATA.teacherInfoKey)}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

