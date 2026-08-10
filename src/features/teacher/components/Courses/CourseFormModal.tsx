import { useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Input, Textarea, Select, Checkbox, type SelectOption } from '@/components/ui';
import { createCourseSchema, type CourseFormValues } from './schemas';
import { useCourseCategories, useCreateCourse, useUpdateCourse } from './queries';
import type { TeacherCourse } from './types';

const DEFAULT_VALUES: CourseFormValues = {
  title: '',
  description: '',
  price: 0,
  currency: 'EGP',
  duration: 1,
  level: 'beginner',
  categoryId: 0,
  isFeatured: false,
  isPublished: true,
};

interface CourseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: TeacherCourse | null;
}

export function CourseFormModal({ isOpen, onClose, course }: CourseFormModalProps) {
  const { t } = useTranslation();
  const schema = useMemo(() => createCourseSchema(t), [t]);
  const { data: categories = [] } = useCourseCategories();
  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();
  const submitting = createCourse.isPending || updateCourse.isPending;

  const levelOptions: SelectOption[] = useMemo(
    () => [
      { value: 'beginner', label: t('teacherPages.courses.levels.beginner') },
      { value: 'intermediate', label: t('teacherPages.courses.levels.intermediate') },
      { value: 'advanced', label: t('teacherPages.courses.levels.advanced') },
    ],
    [t]
  );

  const categoryOptions: SelectOption[] = useMemo(
    () => categories.map((category) => ({ value: String(category.id), label: category.name })),
    [categories]
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
            currency: course.currency,
            duration: course.duration,
            level: course.level,
            categoryId: course.category.id,
            isFeatured: course.isFeatured,
            isPublished: course.isPublished,
          }
        : DEFAULT_VALUES
    );
  }, [isOpen, course, reset]);

  const onSubmit = async (values: CourseFormValues) => {
    try {
      if (course) {
        await updateCourse.mutateAsync({ slug: course.slug, values });
        toast.success(t('teacherPages.courses.toast.updated'));
      } else {
        await createCourse.mutateAsync(values);
        toast.success(t('teacherPages.courses.toast.created'));
      }
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('teacherPages.courses.toast.saveFailed'));
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

        <div className="grid gap-4 sm:grid-cols-3">
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
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.courses.fields.currency')}</label>
            <Input error={errors.currency?.message} {...register('currency')} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.courses.fields.duration')}</label>
            <Input
              type="number"
              min={1}
              error={errors.duration?.message}
              {...register('duration', { valueAsNumber: true })}
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

          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => (
              <Select
                label={t('teacherPages.courses.fields.category')}
                placeholder={t('teacherPages.courses.fields.categoryPlaceholder')}
                options={categoryOptions}
                value={field.value ? String(field.value) : ''}
                onChange={(value) => field.onChange(Number(value))}
                error={errors.categoryId?.message}
              />
            )}
          />
        </div>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm text-[#F9F6F0] cursor-pointer">
            <Checkbox {...register('isFeatured')} />
            {t('teacherPages.courses.fields.isFeatured')}
          </label>
          <label className="flex items-center gap-2 text-sm text-[#F9F6F0] cursor-pointer">
            <Checkbox {...register('isPublished')} />
            {t('teacherPages.courses.fields.isPublished')}
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
