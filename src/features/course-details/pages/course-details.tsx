import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { ArrowLeft, BookOpen, ChevronDown, Play, Lock, GraduationCap, Receipt } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/providers';
import { Modal, Select, Button, Spinner, ErrorState } from '@/components/ui';
import type { PublicCourseDetail, PublicCourseLesson } from '@/services';
import { usePublicCourseDetail } from '@/features/home/components/Courses/queries';
import { useMyCourses, useEnrollCourse, useSubmitPayment } from '@/features/student/components/Dashboard/queries';
import { CourseHero } from '@/features/course-details/components/CourseHero';

const PAYMENT_METHOD_OPTIONS = [
  { value: 'cash', labelKey: 'cash' },
  { value: 'bank_transfer', labelKey: 'bankTransfer' },
  { value: 'vodafone_cash', labelKey: 'vodafoneCash' },
  { value: 'instapay', labelKey: 'instapay' },
] as const;

function PaymentSubmitModal({
  course,
  onClose,
}: {
  course: PublicCourseDetail | null;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const submitPayment = useSubmitPayment();
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [receipt, setReceipt] = useState<File | null>(null);

  const methodOptions = PAYMENT_METHOD_OPTIONS.map((opt) => ({
    value: opt.value,
    label: t(`courseDetails.payment.methods.${opt.labelKey}`),
  }));

  function handleClose() {
    setPaymentMethod('cash');
    setReceipt(null);
    onClose();
  }

  async function handleSubmit() {
    if (!course) return;
    if (!receipt) {
      toast.error(t('courseDetails.payment.receiptRequired'));
      return;
    }
    try {
      await submitPayment.mutateAsync({ courseId: course.id, amount: course.price, paymentMethod, receipt });
      toast.success(t('courseDetails.payment.submitSuccess'));
      handleClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('courseDetails.payment.submitFailed'));
    }
  }

  return (
    <Modal isOpen={course !== null} onClose={handleClose} title={t('courseDetails.payment.title')} size="md">
      {course && (
        <div className="space-y-4">
          <p className="text-sm text-[rgba(249,246,240,0.65)]">{t('courseDetails.payment.description')}</p>

          <div className="flex items-center justify-between rounded-xl border border-[rgba(212,181,158,0.18)] bg-[#16342D] px-4 py-3">
            <span className="text-sm text-[rgba(249,246,240,0.55)]">{t('courseDetails.payment.amount')}</span>
            <span className="text-lg font-bold text-[#D4B59E]">
              {course.price} {course.currency}
            </span>
          </div>

          <Select
            label={t('courseDetails.payment.method')}
            options={methodOptions}
            value={paymentMethod}
            onChange={setPaymentMethod}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('courseDetails.payment.receipt')}</label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setReceipt(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-[rgba(249,246,240,0.65)] file:me-3 file:rounded-lg file:border-0 file:bg-[#D4B59E] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[#0F2520]"
            />
          </div>

          <Button
            type="button"
            onClick={handleSubmit}
            loading={submitPayment.isPending}
            className="w-full bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]"
          >
            <Receipt className="h-4 w-4" />
            {t('courseDetails.payment.submit')}
          </Button>
        </div>
      )}
    </Modal>
  );
}

function LessonVideoModal({
  lesson,
  onClose,
}: {
  lesson: PublicCourseLesson | null;
  onClose: () => void;
}) {
  const { t } = useTranslation();

  return (
    <Modal isOpen={lesson !== null} onClose={onClose} title={lesson?.title ?? ''} size="lg">
      {lesson?.videoUrl ? (
        <video
          controls
          autoPlay
          className="aspect-video w-full rounded-xl border border-[rgba(212,181,158,0.18)] bg-black"
        >
          <source src={lesson.videoUrl} />
        </video>
      ) : (
        <p className="rounded-xl border border-dashed border-[rgba(212,181,158,0.18)] p-6 text-center text-sm text-[rgba(249,246,240,0.55)]">
          {t('courseDetails.curriculum.noVideoYet')}
        </p>
      )}
    </Modal>
  );
}

function CurriculumSection({
  course,
  isEnrolled,
  onPlayLesson,
}: {
  course: PublicCourseDetail;
  isEnrolled: boolean;
  onPlayLesson: (lesson: PublicCourseLesson) => void;
}) {
  const { t } = useTranslation();

  if (course.sections.length === 0) return null;

  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0 bg-[#0F2520] -z-20" />
      <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] rounded-full bg-[#C7A187]/10 blur-[100px] -z-10" />
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
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4B59E]" />
              </span>
              <span className="text-sm font-medium text-[rgba(249,246,240,0.75)]">{t('courseDetails.curriculum.badge')}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-[#D4B59E] via-[#C7A187] to-[#D4B59E] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
                {t('courseDetails.curriculum.title')}
              </span>
            </h2>
            <p className="mt-4 text-[rgba(249,246,240,0.55)]">
              {course.lessonsCount} {t('courseDetails.lessonsUnit')} • {course.duration} {t('courseDetails.hoursUnit')}
            </p>
          </motion.div>
          <div className="space-y-4">
            {course.sections.map((section, idx) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="overflow-hidden rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10"
              >
                <div className="p-5 flex items-center justify-between bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <ChevronDown className="w-5 h-5 text-[#D4B59E]" />
                    <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                  </div>
                  <span className="text-sm text-[rgba(249,246,240,0.55)]">
                    {section.lessons.length} {t('courseDetails.curriculum.lessonsShort')}
                  </span>
                </div>
                <div className="divide-y divide-white/5">
                  {section.lessons.map((lesson) => {
                    const canPlay = lesson.isPreview || isEnrolled;
                    return (
                    <div
                      key={lesson.id}
                      onClick={() => {
                        if (!canPlay) {
                          toast.info(t('courseDetails.curriculum.enrollToWatch'));
                          return;
                        }
                        onPlayLesson(lesson);
                      }}
                      className="flex cursor-pointer items-center justify-between p-4 pr-12 transition-colors hover:bg-white/[0.03]"
                    >
                      <div className="flex items-center gap-3">
                        <Play className={`w-4 h-4 ${lesson.isPreview ? 'text-emerald-400' : 'text-[#D4B59E]'}`} />
                        <span className={`text-sm ${lesson.isPreview ? 'text-[rgba(249,246,240,0.75)]' : 'text-gray-500'}`}>
                          {lesson.title}
                        </span>
                        {lesson.isPreview && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                            {t('courseDetails.curriculum.free')}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        {lesson.duration != null && (
                          <span className="text-xs text-gray-500">
                            {lesson.duration} {t('courseDetails.minutesUnit')}
                          </span>
                        )}
                        {!canPlay && <Lock className="w-4 h-4 text-gray-500" />}
                      </div>
                    </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TeacherSection({ course }: { course: PublicCourseDetail }) {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0 bg-[#0F2520] -z-20" />
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
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4B59E]" />
              </span>
              <span className="text-sm font-medium text-[rgba(249,246,240,0.75)]">{t('courseDetails.teacherSection.badge')}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-[#D4B59E] via-[#C7A187] to-[#D4B59E] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
                {t('courseDetails.teacherSection.title')}
              </span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 p-8"
          >
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#D4B59E]/30 to-[#D4B59E]/30 flex items-center justify-center border border-white/10">
                  <GraduationCap className="w-10 h-10 text-[#D4B59E]" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{course.teacherName}</h3>
                <p className="text-[#D4B59E] text-sm mt-1">{course.categoryName}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CTASection({ course, onSubscribe, subscribing }: { course: PublicCourseDetail; onSubscribe: () => void; subscribing: boolean }) {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-0 bg-[#0F2520] -z-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#D4B59E]/10 to-[#C7A187]/10 blur-[120px] -z-10" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-[#D4B59E] via-[#C7A187] to-[#D4B59E] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
              {t('courseDetails.cta.title')}
            </span>
          </h2>
          <p className="text-lg text-[rgba(249,246,240,0.55)] mb-8">
            {t('courseDetails.cta.joinPrefix')} {course.studentsCount.toLocaleString()}+ {t('courseDetails.cta.joinMiddle')} {course.title}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.button
              type="button"
              onClick={onSubscribe}
              disabled={subscribing}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group overflow-hidden rounded-2xl bg-gradient-to-r from-[#D4B59E] to-[#C7A187] hover:from-[#D4B59E] hover:to-[#D4B59E] text-white border-0 px-10 py-4 text-lg font-bold shadow-lg shadow-blue-600/25 transition-all duration-300 cursor-pointer disabled:opacity-60"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t('courseDetails.subscribeNow')}
                <ArrowLeft className="w-5 h-5 group-hover:translate-x-[-4px] transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 rounded-2xl" />
            </motion.button>
            <Link
              to="/courses"
              className="bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-2xl px-8 py-4 text-base font-semibold backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
            >
              {t('courseDetails.cta.browseCourses')}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function CourseDetailsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { isAuthenticated, role, currentUser } = useAuth();
  const { data: course, isLoading, isError, refetch } = usePublicCourseDetail(slug ?? '');
  const { data: myCourses = [] } = useMyCourses();
  const enrollCourse = useEnrollCourse();
  const [subscribing, setSubscribing] = useState(false);
  const [playingLesson, setPlayingLesson] = useState<PublicCourseLesson | null>(null);
  const [payingForCourse, setPayingForCourse] = useState<PublicCourseDetail | null>(null);

  const isEnrolled = !!course && myCourses.some((c) => c.courseId === course.id);

  async function handleSubscribe() {
    if (!isAuthenticated) {
      navigate('/register');
      return;
    }
    if (role !== 'student' || !currentUser) {
      toast.info(t('courseDetails.studentOnly'));
      return;
    }
    if (!course) return;

    // Paid courses require an approved payment before enrollment — only
    // free courses (price 0) enroll immediately.
    if (course.price > 0) {
      setPayingForCourse(course);
      return;
    }

    setSubscribing(true);
    try {
      await enrollCourse.mutateAsync(course.id);
      toast.success(t('courseDetails.enrollSuccess'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('courseDetails.enrollFailed'));
    } finally {
      setSubscribing(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-[#0F2520]">
        <Spinner />
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center bg-[#0F2520]">
        <div className="text-center max-w-md px-4">
          <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[#D4B59E]/20 to-[#D4B59E]/20 flex items-center justify-center border border-white/10">
            <BookOpen className="w-12 h-12 text-[#D4B59E]" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">{t('courseDetails.notFoundTitle')}</h1>
          <p className="text-[rgba(249,246,240,0.55)] mb-8 leading-relaxed">
            {t('courseDetails.notFoundDescription')}
          </p>
          {isError && (
            <div className="mb-6">
              <ErrorState description={t('courseDetails.loadFailed')} onRetry={() => refetch()} />
            </div>
          )}
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D4B59E] to-[#C7A187] hover:from-[#D4B59E] hover:to-[#D4B59E] text-white font-bold shadow-lg shadow-blue-600/25 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('courseDetails.backToCourses')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0F2520]">
      <CourseHero course={course} onSubscribe={handleSubscribe} subscribing={subscribing} isEnrolled={isEnrolled} />
      <CurriculumSection course={course} isEnrolled={isEnrolled} onPlayLesson={setPlayingLesson} />
      <TeacherSection course={course} />
      <CTASection course={course} onSubscribe={handleSubscribe} subscribing={subscribing} />
      <LessonVideoModal lesson={playingLesson} onClose={() => setPlayingLesson(null)} />
      <PaymentSubmitModal course={payingForCourse} onClose={() => setPayingForCourse(null)} />
    </div>
  );
}
