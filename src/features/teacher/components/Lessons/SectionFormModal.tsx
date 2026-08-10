import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Input, Textarea, Checkbox } from '@/components/ui';
import { useCreateSection, useUpdateSection } from './queries';
import type { TeacherSection, TeacherSectionFormValues } from './types';

function useSectionSchema() {
  const { t } = useTranslation();
  return useMemo(
    () =>
      z.object({
        title: z.string().trim().min(3, t('teacherPages.lessons.validation.sectionTitleRequired')),
        description: z.string().trim(),
        isPublished: z.boolean(),
      }),
    [t]
  );
}

const DEFAULT_VALUES: TeacherSectionFormValues = { title: '', description: '', isPublished: true };

interface SectionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseSlug: string;
  section: TeacherSection | null;
}

export function SectionFormModal({ isOpen, onClose, courseSlug, section }: SectionFormModalProps) {
  const { t } = useTranslation();
  const schema = useSectionSchema();
  const createSection = useCreateSection(courseSlug);
  const updateSection = useUpdateSection(courseSlug);
  const submitting = createSection.isPending || updateSection.isPending;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeacherSectionFormValues>({ resolver: zodResolver(schema), defaultValues: DEFAULT_VALUES });

  useEffect(() => {
    if (!isOpen) return;
    reset(
      section
        ? { title: section.title, description: section.description ?? '', isPublished: section.isPublished }
        : DEFAULT_VALUES
    );
  }, [isOpen, section, reset]);

  const onSubmit = async (values: TeacherSectionFormValues) => {
    try {
      if (section) {
        await updateSection.mutateAsync({ sectionId: section.id, values });
        toast.success(t('teacherPages.lessons.toast.sectionUpdated'));
      } else {
        await createSection.mutateAsync(values);
        toast.success(t('teacherPages.lessons.toast.sectionCreated'));
      }
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('teacherPages.lessons.toast.sectionSaveFailed'));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={section ? t('teacherPages.lessons.editSection') : t('teacherPages.lessons.addSection')}
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.lessons.fields.sectionTitle')}</label>
          <Input error={errors.title?.message} {...register('title')} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.lessons.fields.description')}</label>
          <Textarea rows={2} error={errors.description?.message} {...register('description')} />
        </div>

        <label className="flex items-center gap-2 text-sm text-[#F9F6F0] cursor-pointer">
          <Checkbox {...register('isPublished')} />
          {t('teacherPages.lessons.fields.sectionIsPublished')}
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
