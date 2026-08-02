import { useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Input, Textarea, Select, Checkbox, type SelectOption } from '@/components/ui';
import { createQuizSchema, type QuizSchemaValues } from './schemas';
import { createQuiz, updateQuiz } from './quiz-store';
import { getCourses } from '@/features/teacher/components/Courses/course-store';
import { getLessonsForCourse } from '@/features/teacher/components/Lessons/lesson-store';
import type { Quiz } from '@/types';

const DEFAULT_VALUES: QuizSchemaValues = {
  title: '',
  description: '',
  courseId: 0,
  lessonId: 0,
  timeLimit: 15,
  passingScore: 60,
  maxAttempts: 1,
  isPublished: true,
};

interface QuizFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  quiz: Quiz | null;
  onSaved: () => void;
}

export function QuizFormModal({ isOpen, onClose, quiz, onSaved }: QuizFormModalProps) {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const schema = useMemo(() => createQuizSchema(t), [t]);
  const courses = useMemo(() => getCourses(), []);

  const courseOptions: SelectOption[] = useMemo(
    () => courses.map((c) => ({ value: String(c.id), label: c.title })),
    [courses]
  );

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<QuizSchemaValues>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  });

  const selectedCourseId = watch('courseId');
  const lessonOptions: SelectOption[] = useMemo(() => {
    const lessons = selectedCourseId ? getLessonsForCourse(selectedCourseId) : [];
    return [
      { value: '0', label: t('teacherPages.quizzesExams.fields.lessonNone') },
      ...lessons.map((l) => ({ value: String(l.id), label: l.title })),
    ];
  }, [selectedCourseId, t]);

  useEffect(() => {
    if (!isOpen) return;
    reset(
      quiz
        ? {
            title: quiz.title,
            description: quiz.description,
            courseId: quiz.courseId,
            lessonId: quiz.lessonId,
            timeLimit: quiz.timeLimit,
            passingScore: quiz.passingScore,
            maxAttempts: quiz.maxAttempts,
            isPublished: quiz.isPublished,
          }
        : DEFAULT_VALUES
    );
  }, [isOpen, quiz, reset]);

  const onSubmit = async (values: QuizSchemaValues) => {
    setSubmitting(true);
    try {
      if (quiz) {
        updateQuiz(quiz.id, values);
        toast.success(t('teacherPages.quizzesExams.toast.quizUpdated'));
      } else {
        createQuiz(values);
        toast.success(t('teacherPages.quizzesExams.toast.quizCreated'));
      }
      onSaved();
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={quiz ? t('teacherPages.quizzesExams.editQuiz') : t('teacherPages.quizzesExams.addQuiz')}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.quizzesExams.fields.title')}</label>
          <Input error={errors.title?.message} {...register('title')} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.quizzesExams.fields.description')}</label>
          <Textarea rows={3} error={errors.description?.message} {...register('description')} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Controller
            control={control}
            name="courseId"
            render={({ field }) => (
              <Select
                label={t('teacherPages.quizzesExams.fields.course')}
                options={courseOptions}
                value={field.value ? String(field.value) : ''}
                onChange={(v) => field.onChange(Number(v))}
                error={errors.courseId?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="lessonId"
            render={({ field }) => (
              <Select
                label={t('teacherPages.quizzesExams.fields.lesson')}
                options={lessonOptions}
                value={String(field.value)}
                onChange={(v) => field.onChange(Number(v))}
              />
            )}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.quizzesExams.fields.timeLimit')}</label>
            <Input type="number" min={1} error={errors.timeLimit?.message} {...register('timeLimit', { valueAsNumber: true })} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.quizzesExams.fields.passingScore')}</label>
            <Input type="number" min={0} error={errors.passingScore?.message} {...register('passingScore', { valueAsNumber: true })} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.quizzesExams.fields.maxAttempts')}</label>
            <Input type="number" min={1} error={errors.maxAttempts?.message} {...register('maxAttempts', { valueAsNumber: true })} />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-[#F9F6F0] cursor-pointer">
          <Checkbox {...register('isPublished')} />
          {t('teacherPages.quizzesExams.fields.isPublished')}
        </label>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            {t('teacherPages.courses.cancel')}
          </Button>
          <Button type="submit" loading={submitting} className="bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]">
            {t('teacherPages.courses.save')}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
