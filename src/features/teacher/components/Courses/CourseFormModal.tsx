import { useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Input, Textarea, Select, Checkbox, type SelectOption } from '@/components/ui';
import { createCourseSchema, type CourseFormValues } from './schemas';
import { createCourse, updateCourse } from './course-store';
import { currentTeacher } from '@/features/teacher/components/Dashboard';
import type { Course } from '@/types';

const DEFAULT_VALUES: CourseFormValues = {
  title: '',
  description: '',
  price: 0,
  duration: '',
  level: 'beginner',
  category: '',
  isPublished: true,
};

interface CourseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  onSaved: () => void;
}

export function CourseFormModal({ isOpen, onClose, course, onSaved }: CourseFormModalProps) {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const schema = useMemo(() => createCourseSchema(t), [t]);

  const levelOptions: SelectOption[] = useMemo(
    () => [
      { value: 'beginner', label: t('teacherPages.courses.levels.beginner') },
      { value: 'intermediate', label: t('teacherPages.courses.levels.intermediate') },
      { value: 'advanced', label: t('teacherPages.courses.levels.advanced') },
    ],
    [t]
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (!isOpen) return;
    reset(
      course
        ? {
            title: course.title,
            description: course.description,
            price: course.price,
            duration: course.duration,
            level: course.level,
            category: course.category,
            isPublished: course.isPublished,
          }
        : DEFAULT_VALUES
    );
  }, [isOpen, course, reset]);

  const onSubmit = async (values: CourseFormValues) => {
    setSubmitting(true);
    try {
      if (course) {
        updateCourse(course.id, values);
        toast.success(t('teacherPages.courses.toast.updated'));
      } else {
        createCourse(values, currentTeacher.id, currentTeacher.name);
        toast.success(t('teacherPages.courses.toast.created'));
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
      title={course ? t('teacherPages.courses.editCourse') : t('teacherPages.courses.addCourse')}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.courses.fields.title')}</label>
          <Input error={errors.title?.message} {...register('title')} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.courses.fields.description')}</label>
          <Textarea rows={3} error={errors.description?.message} {...register('description')} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.courses.fields.price')}</label>
            <Input
              type="number"
              min={0}
              error={errors.price?.message}
              {...register('price', { valueAsNumber: true })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.courses.fields.duration')}</label>
            <Input
              placeholder={t('teacherPages.courses.fields.durationPlaceholder')}
              error={errors.duration?.message}
              {...register('duration')}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Controller
            control={control}
            name="level"
            render={({ field }) => (
              <Select
                label={t('teacherPages.courses.fields.level')}
                options={levelOptions}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.courses.fields.category')}</label>
            <Input
              placeholder={t('teacherPages.courses.fields.categoryPlaceholder')}
              error={errors.category?.message}
              {...register('category')}
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-[#F9F6F0] cursor-pointer">
          <Checkbox {...register('isPublished')} />
          {t('teacherPages.courses.fields.isPublished')}
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
