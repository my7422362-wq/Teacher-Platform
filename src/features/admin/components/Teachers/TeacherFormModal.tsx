import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Input } from '@/components/ui';
import { createTeacherSchema, type TeacherFormSchemaValues } from './schemas';
import { useCreateTeacher } from './queries';

const DEFAULT_VALUES: TeacherFormSchemaValues = { name: '', email: '', phone: '', password: '' };

interface TeacherFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TeacherFormModal({ isOpen, onClose }: TeacherFormModalProps) {
  const { t } = useTranslation();
  const schema = useMemo(() => createTeacherSchema(t), [t]);
  const createTeacher = useCreateTeacher();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeacherFormSchemaValues>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (isOpen) reset(DEFAULT_VALUES);
  }, [isOpen, reset]);

  const onSubmit = async (values: TeacherFormSchemaValues) => {
    try {
      await createTeacher.mutateAsync(values);
      toast.success(t('adminPages.teachers.toast.created'));
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('adminPages.teachers.toast.createFailed'));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('adminPages.teachers.addTeacher')} size="md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('adminPages.teachers.fields.name')}</label>
          <Input error={errors.name?.message} {...register('name')} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('adminPages.teachers.fields.email')}</label>
          <Input type="email" dir="ltr" error={errors.email?.message} {...register('email')} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('adminPages.teachers.fields.phone')}</label>
          <Input dir="ltr" error={errors.phone?.message} {...register('phone')} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('adminPages.teachers.fields.password')}</label>
          <Input type="password" dir="ltr" error={errors.password?.message} {...register('password')} />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            {t('teacherPages.courses.cancel')}
          </Button>
          <Button type="submit" loading={createTeacher.isPending} className="bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]">
            {t('teacherPages.courses.save')}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
