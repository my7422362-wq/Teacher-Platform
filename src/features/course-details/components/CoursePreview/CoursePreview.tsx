import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Play, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import type { CourseDetail } from '../../types/course';

interface CoursePreviewProps {
  course: CourseDetail;
  className?: string;
}

const itemFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export function CoursePreview({ course, className }: CoursePreviewProps) {
  const { t } = useTranslation();

  const handlePlay = () => {
    toast.info(t('courseDetails.previewComingSoon'));
  };

  return (
    <section className={cn('relative overflow-hidden py-16 sm:py-20', className)}>
      <div className="absolute inset-0 bg-[#0F2520] -z-20" />
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={itemFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4B59E]" />
              </span>
              <span className="text-sm font-medium text-[rgba(249,246,240,0.75)]">{t('courseDetails.preview.badge')}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-[#D4B59E] via-[#C7A187] to-[#D4B59E] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
                {t('courseDetails.preview.title')}
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[rgba(249,246,240,0.55)] leading-relaxed max-w-2xl mx-auto">
              {course.previewVideo.description}
            </p>
          </motion.div>
          <motion.div
            variants={itemFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="relative mx-auto max-w-4xl"
          >
            <div className="relative overflow-hidden rounded-3xl bg-black shadow-2xl shadow-blue-500/10 border border-white/10 group">
              <div className="relative aspect-video bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.08),transparent_50%)]" />
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-8 right-8 w-32 h-32 border border-white/10 rounded-full" />
                  <div className="absolute bottom-8 left-8 w-48 h-48 border border-white/5 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/5 rounded-full" />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-center px-6">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                      {course.previewVideo.title}
                    </h3>
                    <div className="flex items-center justify-center gap-2 text-[rgba(249,246,240,0.55)] mb-6">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{course.previewVideo.duration}</span>
                    </div>
                    <motion.button
                      type="button"
                      onClick={handlePlay}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-[#D4B59E] to-[#C7A187] hover:from-[#D4B59E] hover:to-[#D4B59E] flex items-center justify-center shadow-2xl shadow-blue-600/30 cursor-pointer transition-all duration-300 mx-auto"
                    >
                      <div className="absolute inset-0 rounded-full bg-white/10 animate-ping opacity-30" />
                      <div className="absolute inset-2 rounded-full bg-white/5 backdrop-blur-sm" />
                      <Play className="relative w-8 h-8 sm:w-10 sm:h-10 text-white fill-white mr-1" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 p-6 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4B59E]/20 to-[#D4B59E]/20 flex items-center justify-center flex-shrink-0">
                  <Play className="w-5 h-5 text-[#D4B59E]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-semibold text-white mb-1">{course.previewVideo.title}</h4>
                  <p className="text-sm text-[rgba(249,246,240,0.55)] leading-relaxed">{course.previewVideo.description}</p>
                </div>
                <div className="flex-shrink-0 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-sm font-medium text-[#D4B59E]">{course.previewVideo.duration}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

