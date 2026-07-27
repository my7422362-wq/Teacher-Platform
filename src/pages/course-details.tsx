import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, CheckCircle, ChevronDown, Star, Award, Users, Play, Shield, Monitor, Smartphone, Infinity, RefreshCw, Video, FileText, ClipboardCheck, CheckSquare, Feather, Library, Pen, Pencil, GraduationCap, Quote, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCourseBySlug } from '@/features/course-details/data/course.mock';
import { CourseHero } from '@/features/course-details/components/CourseHero';
import { CoursePreview } from '@/features/course-details/components/CoursePreview/CoursePreview';
import type { CourseDetail } from '@/features/course-details/types/course';

const iconMap: Record<string, React.ElementType> = {
  BookOpen, FileText, Feather, Library, Pen, Pencil, CheckSquare, RefreshCw,
  Video, ClipboardCheck, Award, Infinity, Smartphone, Monitor,
};

function getIcon(iconName: string): React.ElementType {
  return iconMap[iconName] || BookOpen;
}

function LearningObjectivesSection({ course }: { course: CourseDetail }) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20" dir="rtl">
      <div className="absolute inset-0 bg-[#050816] -z-20" />
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
              </span>
              <span className="text-sm font-medium text-gray-300">ماذا ستتعلم</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
                ماذا ستتعلم في هذه الدورة؟
              </span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {course.learningObjectives.map((obj, idx) => {
              const IconComponent = getIcon(obj.icon);
              return (
                <motion.div
                  key={obj.id}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">{obj.title}</h4>
                    <p className="text-sm text-gray-400">{obj.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function CurriculumSection({ course }: { course: CourseDetail }) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20" dir="rtl">
      <div className="absolute inset-0 bg-[#050816] -z-20" />
      <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[100px] -z-10" />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
              </span>
              <span className="text-sm font-medium text-gray-300">المنهج الدراسي</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
                المنهج الدراسي للدورة
              </span>
            </h2>
            <p className="mt-4 text-gray-400">
              {course.curriculum.reduce((acc, unit) => acc + unit.lessons.length, 0)} درس • {course.hoursCount} ساعة
            </p>
          </motion.div>
          <div className="space-y-4">
            {course.curriculum.map((unit, idx) => (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="overflow-hidden rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10"
              >
                <div className="p-5 flex items-center justify-between bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <ChevronDown className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">{unit.title}</h3>
                  </div>
                  <span className="text-sm text-gray-400">{unit.lessons.length} دروس</span>
                </div>
                <div className="divide-y divide-white/5">
                  {unit.lessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between p-4 pr-12">
                      <div className="flex items-center gap-3">
                        {lesson.type === 'video' ? (
                          <Play className={`w-4 h-4 ${lesson.isFree ? 'text-emerald-400' : 'text-blue-400'}`} />
                        ) : lesson.type === 'quiz' ? (
                          <CheckSquare className="w-4 h-4 text-purple-400" />
                        ) : (
                          <ClipboardCheck className="w-4 h-4 text-amber-400" />
                        )}
                        <span className={`text-sm ${lesson.isLocked ? 'text-gray-500' : 'text-gray-300'}`}>
                          {lesson.title}
                        </span>
                        {lesson.isFree && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                            مجاني
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">{lesson.duration}</span>
                        {lesson.isLocked && (
                          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection({ course }: { course: CourseDetail }) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20" dir="rtl">
      <div className="absolute inset-0 bg-[#050816] -z-20" />
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
              </span>
              <span className="text-sm font-medium text-gray-300">مميزات الدورة</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
                مميزات الدورة
              </span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {course.features.map((feature, idx) => {
              const IconComponent = getIcon(feature.icon);
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white">{feature.title}</h4>
                    <p className="text-xs text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TeacherSection({ course }: { course: CourseDetail }) {
  const teacher = course.teacher;
  return (
    <section className="relative overflow-hidden py-16 sm:py-20" dir="rtl">
      <div className="absolute inset-0 bg-[#050816] -z-20" />
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
              </span>
              <span className="text-sm font-medium text-gray-300">المعلم</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
                تعلم مع خبير
              </span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 p-8"
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center border border-white/10">
                  <GraduationCap className="w-12 h-12 text-blue-400" />
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{teacher.name}</h3>
                  <p className="text-blue-400 text-sm">{teacher.title}</p>
                </div>
                <p className="text-gray-400 leading-relaxed">{teacher.bio}</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span className="text-sm text-gray-300">{teacher.yearsOfExperience}+ سنوات خبرة</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-300">{teacher.studentsCount.toLocaleString()}+ طالب</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-sm text-gray-300">{teacher.rating} تقييم</span>
                  </div>
                </div>
                {teacher.achievements.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-300">الإنجازات:</h4>
                    <div className="flex flex-wrap gap-2">
                      {teacher.achievements.map((achievement, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-sm text-amber-300">
                          <Award className="w-3.5 h-3.5" />
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ReviewsSection({ course }: { course: CourseDetail }) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20" dir="rtl">
      <div className="absolute inset-0 bg-[#050816] -z-20" />
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
              </span>
              <span className="text-sm font-medium text-gray-300">آراء الطلاب</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
                آراء الطلاب
              </span>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="text-3xl font-bold text-amber-400">{course.rating}</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`w-5 h-5 ${star <= Math.round(course.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`} />
                ))}
              </div>
              <span className="text-gray-400">({course.reviews.length} تقييم)</span>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {course.reviews.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center border border-white/10 flex-shrink-0">
                    <span className="text-lg font-bold text-blue-300">{review.studentName.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-white">{review.studentName}</h4>
                    <p className="text-xs text-gray-500">{review.grade}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">&ldquo;{review.content}&rdquo;</p>
                <p className="text-xs text-gray-600 mt-3">{review.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection({ course }: { course: CourseDetail }) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20" dir="rtl">
      <div className="absolute inset-0 bg-[#050816] -z-20" />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
              </span>
              <span className="text-sm font-medium text-gray-300">الأسئلة الشائعة</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
                الأسئلة الشائعة
              </span>
            </h2>
          </motion.div>
          <div className="space-y-4">
            {course.faq.map((item, idx) => (
              <motion.details
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group overflow-hidden rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 open:border-blue-500/30 transition-all duration-300"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <span className="text-base font-medium text-white group-open:text-blue-400 transition-colors">
                    {item.question}
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 group-open:text-blue-400 transition-all duration-300" />
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-sm text-gray-400 leading-relaxed">{item.answer}</p>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection({ course }: { course: CourseDetail }) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24" dir="rtl">
      <div className="absolute inset-0 bg-[#050816] -z-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-[120px] -z-10" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
              ابدأ رحلة التعلم اليوم
            </span>
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            انضم إلى {course.studentsCount.toLocaleString()}+ طالب وابدأ رحلتك في إتقان {course.title}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 px-10 py-4 text-lg font-bold shadow-lg shadow-blue-600/25 transition-all duration-300 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                اشترك الآن
                <ArrowLeft className="w-5 h-5 group-hover:translate-x-[-4px] transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 rounded-2xl" />
            </motion.button>
            <Link
              to="/courses"
              className="bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-2xl px-8 py-4 text-base font-semibold backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
            >
              تصفح الدورات
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function CourseDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const course = slug ? getCourseBySlug(slug) : undefined;

  if (!course) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center bg-[#050816]" dir="rtl">
        <div className="text-center max-w-md px-4">
          <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
            <BookOpen className="w-12 h-12 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">الكورس غير موجود</h1>
          <p className="text-gray-400 mb-8 leading-relaxed">
            عذراً، لم نتمكن من العثور على الكورس الذي تبحث عنه. قد يكون قد تم إزالته أو الرابط غير صحيح.
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold shadow-lg shadow-blue-600/25 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            العودة للدورات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050816]">
      <CourseHero course={course} />
      <CoursePreview course={course} />
      <LearningObjectivesSection course={course} />
      <CurriculumSection course={course} />
      <FeaturesSection course={course} />
      <TeacherSection course={course} />
      <ReviewsSection course={course} />
      <FAQSection course={course} />
      <CTASection course={course} />
    </div>
  );
}

