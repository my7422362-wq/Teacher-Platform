import { useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Input, Textarea, Select, type SelectOption } from '@/components/ui';
import { createExamSchema, type ExamSchemaValues } from './schemas';
import { useCreateExam, useUpdateExam } from './queries';
import { useTeacherCourses } from '@/features/teacher/components/Courses/queries';
import type { TeacherExam } from './types';

function toDatetimeLocal(iso: string): string {
  const date = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

const DEFAULT_VALUES: ExamSchemaValues = {
  title: '',
  description: '',
  courseId: 0,
  startDate: '',
  endDate: '',
  durationMinutes: 30,
  passingScore: 60,
};

interface ExamFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  exam: TeacherExam | null;
}

export function ExamFormModal({ isOpen, onClose, exam }: ExamFormModalProps) {
  const { t } = useTranslation();
  const schema = useMemo(() => createExamSchema(t), [t]);

  const { data: courses = [] } = useTeacherCourses();
  const createExam = useCreateExam();
  const updateExam = useUpdateExam();
  const submitting = createExam.isPending || updateExam.isPending;

  const courseOptions: SelectOption[] = useMemo(
    () => courses.map((c) => ({ value: String(c.id), label: c.title })),
    [courses]
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ExamSchemaValues>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (!isOpen) return;
    reset(
      exam
        ? {
            title: exam.title,
            description: exam.description ?? '',
            courseId: exam.courseId,
            startDate: toDatetimeLocal(exam.startDate),
            endDate: toDatetimeLocal(exam.endDate),
            durationMinutes: exam.durationMinutes,
            passingScore: exam.passingScore,
          }
        : DEFAULT_VALUES
    );
  }, [isOpen, exam, reset]);

  const onSubmit = async (values: ExamSchemaValues) => {
    try {
      const payload = {
        ...values,
        startDate: new Date(values.startDate).toISOString(),
        endDate: new Date(values.endDate).toISOString(),
      };
      if (exam) {
        await updateExam.mutateAsync({ examId: exam.id, values: payload });
        toast.success(t('teacherPages.quizzesExams.toast.examUpdated'));
      } else {
        await createExam.mutateAsync(payload);
        toast.success(t('teacherPages.quizzesExams.toast.examCreated'));
      }
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('teacherPages.quizzesExams.toast.examSaveFailed'));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={exam ? t('teacherPages.quizzesExams.editExam') : t('teacherPages.quizzesExams.addExam')}
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
              disabled={!!exam}
            />
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.quizzesExams.fields.startDate')}</label>
            <Input type="datetime-local" error={errors.startDate?.message} {...register('startDate')} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.quizzesExams.fields.endDate')}</label>
            <Input type="datetime-local" error={errors.endDate?.message} {...register('endDate')} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.quizzesExams.fields.duration')}</label>
            <Input type="number" min={1} error={errors.durationMinutes?.message} {...register('durationMinutes', { valueAsNumber: true })} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.quizzesExams.fields.passingScore')}</label>
            <Input type="number" min={0} error={errors.passingScore?.message} {...register('passingScore', { valueAsNumber: true })} />
          </div>
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
