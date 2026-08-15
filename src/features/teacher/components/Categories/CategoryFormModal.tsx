import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Input, Textarea, Checkbox } from '@/components/ui';
import { createCategorySchema, type CategoryFormSchemaValues } from './schemas';
import { useCreateCategory, useUpdateCategory } from './queries';
import type { Category } from '@/services';

const DEFAULT_VALUES: CategoryFormSchemaValues = {
  name: '',
  description: '',
  icon: '',
  isActive: true,
};

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
}

export function CategoryFormModal({ isOpen, onClose, category }: CategoryFormModalProps) {
  const { t } = useTranslation();
  const schema = useMemo(() => createCategorySchema(t), [t]);
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const submitting = createCategory.isPending || updateCategory.isPending;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormSchemaValues>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (!isOpen) return;
    reset(
      category
        ? {
            name: category.name,
            description: category.description ?? '',
            icon: category.icon ?? '',
            isActive: category.isActive,
          }
        : DEFAULT_VALUES
    );
  }, [isOpen, category, reset]);

  const onSubmit = async (values: CategoryFormSchemaValues) => {
    try {
      if (category) {
        await updateCategory.mutateAsync({ categoryId: category.id, values });
        toast.success(t('teacherPages.categories.toast.updated'));
      } else {
        await createCategory.mutateAsync(values);
        toast.success(t('teacherPages.categories.toast.created'));
      }
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('teacherPages.categories.toast.saveFailed'));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={category ? t('teacherPages.categories.editCategory') : t('teacherPages.categories.addCategory')}
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.categories.fields.name')}</label>
          <Input error={errors.name?.message} {...register('name')} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.categories.fields.description')}</label>
          <Textarea rows={3} error={errors.description?.message} {...register('description')} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.categories.fields.icon')}</label>
          <Input placeholder={t('teacherPages.categories.fields.iconPlaceholder')} {...register('icon')} />
        </div>

        <label className="flex items-center gap-2 text-sm text-[#F9F6F0] cursor-pointer">
          <Checkbox {...register('isActive')} />
          {t('teacherPages.categories.fields.isActive')}
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
