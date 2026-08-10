import { useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Modal, Button, Input, Textarea, Select, Checkbox, type SelectOption } from '@/components/ui';
import { createQuizSchema, type QuizSchemaValues } from './schemas';
import { useCreateQuiz, useUpdateQuiz } from './queries';
import { useTeacherCourses } from '@/features/teacher/components/Courses/queries';
import { useCourseSections } from '@/features/teacher/components/Lessons/queries';
import type { TeacherQuiz } from './types';

const DEFAULT_VALUES: QuizSchemaValues = {
  title: '',
  description: '',
  courseSectionId: 0,
  timeLimit: 15,
  passingScore: 60,
  maxAttempts: 1,
  isPublished: true,
};

interface QuizFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  quiz: TeacherQuiz | null;
}

export function QuizFormModal({ isOpen, onClose, quiz }: QuizFormModalProps) {
  const { t } = useTranslation();
  const schema = useMemo(() => createQuizSchema(t), [t]);

  const { data: courses = [] } = useTeacherCourses();
  const createQuiz = useCreateQuiz();
  const updateQuiz = useUpdateQuiz();
  const submitting = createQuiz.isPending || updateQuiz.isPending;

  const [selectedCourseSlug, setSelectedCourseSlug] = useState('');
  const { data: sections = [], isLoading: sectionsLoading, isError: sectionsError } = useCourseSections(selectedCourseSlug);
  const noSectionsYet = !!selectedCourseSlug && !sectionsLoading && !sectionsError && sections.length === 0;

  const courseOptions: SelectOption[] = useMemo(
    () => courses.map((c) => ({ value: c.slug, label: c.title })),
    [courses]
  );
  const sectionOptions: SelectOption[] = useMemo(
    () => sections.map((s) => ({ value: String(s.id), label: s.title })),
    [sections]
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<QuizSchemaValues>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (!isOpen) return;
    if (quiz) {
      const ownerCourse = quiz.courseId ? courses.find((c) => c.id === quiz.courseId) : undefined;
      setSelectedCourseSlug(ownerCourse?.slug ?? '');
      reset({
        title: quiz.title,
        description: quiz.description ?? '',
        courseSectionId: quiz.courseSectionId ?? 0,
        timeLimit: quiz.timeLimit,
        passingScore: quiz.passingScore,
        maxAttempts: quiz.maxAttempts,
        isPublished: quiz.isPublished,
      });
    } else {
      setSelectedCourseSlug('');
      reset(DEFAULT_VALUES);
    }
  }, [isOpen, quiz, courses, reset]);

  const onSubmit = async (values: QuizSchemaValues) => {
    try {
      if (quiz) {
        await updateQuiz.mutateAsync({ quizId: quiz.id, values });
        toast.success(t('teacherPages.quizzesExams.toast.quizUpdated'));
      } else {
        await createQuiz.mutateAsync(values);
        toast.success(t('teacherPages.quizzesExams.toast.quizCreated'));
      }
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('teacherPages.quizzesExams.toast.quizSaveFailed'));
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
          <Select
            label={t('teacherPages.quizzesExams.fields.course')}
            options={courseOptions}
            value={selectedCourseSlug}
            onChange={(v) => setSelectedCourseSlug(v)}
            disabled={!!quiz}
          />

          <div className="space-y-2">
            <Controller
              control={control}
              name="courseSectionId"
              render={({ field }) => (
                <Select
                  label={t('teacherPages.quizzesExams.fields.section')}
                  options={sectionOptions}
                  value={field.value ? String(field.value) : ''}
                  onChange={(v) => field.onChange(Number(v))}
                  error={errors.courseSectionId?.message}
                  disabled={!!quiz || !selectedCourseSlug || sectionsLoading}
                />
              )}
            />
            {noSectionsYet && (
              <p className="text-xs text-[rgba(249,246,240,0.55)]">
                {t('teacherPages.quizzesExams.noSectionsHint')}{' '}
                <Link
                  to={`/teacher/courses/${selectedCourseSlug}/lessons`}
                  className="text-[#D4B59E] hover:underline"
                  onClick={onClose}
                >
                  {t('teacherPages.quizzesExams.noSectionsHintLink')}
                </Link>
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.quizzesExams.fields.timeLimit')}</label>
            <Input type="number" min={1} error={errors.timeLimit?.message} {...register('timeLimit', { valueAsNumber: true })} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.quizzesExams.fields.passingScore')}</label>
            <Input type="number" min={0} error={errors.passingScore?.message} {...register('passingScore', { valueAsNumber: true })} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.quizzesExams.fields.maxAttempts')}</label>
            <Input type="number" min={1} error={errors.maxAttempts?.message} {...register('maxAttempts', { valueAsNumber: true })} />
          </div>
          <label className="flex items-center gap-2 self-end pb-2 text-sm text-[#F9F6F0]">
            <Checkbox {...register('isPublished')} />
            {t('teacherPages.quizzesExams.fields.isPublished')}
          </label>
        </div>

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
