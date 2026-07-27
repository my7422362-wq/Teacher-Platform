import { motion } from 'framer-motion';
import { Star, Users, BookOpen, Clock, Shield, Play, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CourseDetail } from '../../types/course';

interface CourseHeroProps {
  course: CourseDetail;
  className?: string;
}

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

export function CourseHero({ course, className }: CourseHeroProps) {
  return (
    <section
      className={cn('relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pb-24', className)}
      dir="rtl"
    >
      <div className="absolute inset-0 bg-[#050816] -z-20" />
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[120px] -z-10 animate-[orb-float_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] rounded-full bg-purple-500/15 blur-[100px] -z-10 animate-[orb-float-2_10s_ease-in-out_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[150px] -z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={itemFadeUp} className="flex items-center gap-2 mb-8 text-sm text-gray-400">
            <a href="/courses" className="hover:text-blue-400 transition-colors">الدورات</a>
            <span>/</span>
            <span className="text-blue-400">{course.title}</span>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-3 space-y-8">
              {course.badge && (
                <motion.div variants={itemFadeUp}>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/20 text-sm font-medium text-blue-300">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
                    </span>
                    {course.badge}
                  </span>
                </motion.div>
              )}

              <motion.h1
                variants={itemFadeUp}
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
              >
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
                  {course.title}
                </span>
              </motion.h1>

              <motion.p variants={itemFadeUp} className="text-xl text-gray-300 leading-relaxed">
                {course.subtitle}
              </motion.p>

              <motion.p variants={itemFadeUp} className="text-base text-gray-400 leading-relaxed leading-loose">
                {course.description}
              </motion.p>

              <motion.div
                variants={itemFadeUp}
                className="flex flex-wrap items-center gap-4 sm:gap-6"
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="text-lg font-bold text-amber-400">{course.rating}</span>
                  <span className="text-sm text-gray-400">({course.studentsCount}+)</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-gray-300">{course.studentsCount.toLocaleString()} طالب</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-gray-300">{course.lessonsCount} درس</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm text-gray-300">{course.hoursCount} ساعة</span>
                </div>
              </motion.div>

              <motion.div
                variants={itemFadeUp}
                className="flex flex-wrap items-center gap-4 text-sm text-gray-400"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>اللغة: {course.language}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span>المستوى: {course.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>آخر تحديث: {course.lastUpdated}</span>
                </div>
              </motion.div>

              <motion.div variants={itemFadeUp} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center border border-white/10">
                  <span className="text-lg font-bold text-blue-300">ع</span>
                </div>
                <div>
                  <p className="text-sm text-gray-400">مقدم من</p>
                  <p className="text-base font-semibold text-white">{course.teacher.name}</p>
                </div>
              </motion.div>

              <motion.div variants={itemFadeUp} className="flex flex-wrap items-center gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 px-8 py-4 text-base font-bold shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 transition-all duration-300 cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    اشترك الآن
                    <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 rounded-2xl" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-2xl px-8 py-4 text-base font-semibold backdrop-blur-sm transition-all duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-5 h-5" />
                  شاهد الدرس التجريبي
                </motion.button>
              </motion.div>
            </div>

            <motion.div
              variants={itemFadeUp}
              className="lg:col-span-2 lg:sticky lg:top-28 self-start"
            >
              <div className="relative overflow-hidden rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 p-8 shadow-lg hover:border-blue-500/30 transition-all duration-500">
                <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                <div className={cn('absolute inset-0 rounded-3xl bg-gradient-to-br opacity-20', course.bannerGradient)} />

                <div className="relative z-10 space-y-6">
                  <div className="text-center">
                    <div className="flex items-baseline justify-center gap-3">
                      <span className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {course.price}
                      </span>
                      <span className="text-lg text-gray-400">{course.currency}</span>
                    </div>
                    {course.oldPrice && (
                      <div className="mt-2">
                        <span className="text-lg text-gray-500 line-through">
                          {course.oldPrice} {course.currency}
                        </span>
                        <span className="mr-3 text-sm text-emerald-400 font-medium">
                          وفر {course.oldPrice - course.price} {course.currency}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                      <span className="text-gray-400">عدد الطلاب</span>
                      <span className="text-white font-medium">{course.studentsCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                      <span className="text-gray-400">عدد الدروس</span>
                      <span className="text-white font-medium">{course.lessonsCount}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                      <span className="text-gray-400">إجمالي الساعات</span>
                      <span className="text-white font-medium">{course.hoursCount}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                      <span className="text-gray-400">شهادة معتمدة</span>
                      <span className="text-emerald-400 font-medium">✓</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                      <span className="text-gray-400">دخول مدى الحياة</span>
                      <span className="text-emerald-400 font-medium">✓</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-400">اللغة</span>
                      <span className="text-white font-medium">{course.language}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group cursor-pointer w-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 hover:from-blue-500 hover:via-blue-400 hover:to-purple-500 text-white border-0 px-6 py-4 text-base font-bold shadow-lg shadow-blue-600/25 transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      اشترك الآن
                      <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 rounded-2xl" />
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050816] to-transparent -z-10" />
    </section>
  );
}

