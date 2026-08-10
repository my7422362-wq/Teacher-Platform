import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Input, Checkbox, Spinner } from '@/components/ui';
import { createParentSchema, type ParentSchemaValues } from './schemas';
import { useCreateParent, useUpdateParent } from './queries';
import { useStudentsList } from '@/features/teacher/components/Groups/queries';
import type { TeacherParent } from './types';

const DEFAULT_VALUES: ParentSchemaValues = { name: '', email: '', phone: '', password: '', studentIds: [] };

interface ParentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  parent: TeacherParent | null;
}

export function ParentFormModal({ isOpen, onClose, parent }: ParentFormModalProps) {
  const { t } = useTranslation();
  const schema = useMemo(() => createParentSchema(t, !parent), [t, parent]);
  const { data: students = [], isLoading: studentsLoading } = useStudentsList();
  const createParent = useCreateParent();
  const updateParent = useUpdateParent();
  const submitting = createParent.isPending || updateParent.isPending;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ParentSchemaValues>({ resolver: zodResolver(schema), defaultValues: DEFAULT_VALUES });

  const studentIds = watch('studentIds');

  useEffect(() => {
    if (!isOpen) return;
    reset(
      parent
        ? { name: parent.name, email: parent.email, phone: parent.phone ?? '', password: '', studentIds: parent.students.map((s) => s.id) }
        : DEFAULT_VALUES
    );
  }, [isOpen, parent, reset]);

  function toggleStudent(id: number) {
    setValue('studentIds', studentIds.includes(id) ? studentIds.filter((s) => s !== id) : [...studentIds, id]);
  }

  const onSubmit = async (values: ParentSchemaValues) => {
    try {
      if (parent) {
        await updateParent.mutateAsync({ parentId: parent.id, values });
        toast.success(t('teacherPages.parents.toast.updated'));
      } else {
        await createParent.mutateAsync(values);
        toast.success(t('teacherPages.parents.toast.created'));
      }
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('teacherPages.parents.toast.saveFailed'));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={parent ? t('teacherPages.parents.editParent') : t('teacherPages.parents.addParent')}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="max-h-[70vh] space-y-4 overflow-y-auto pe-1" noValidate>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.parents.fields.name')}</label>
          <Input error={errors.name?.message} {...register('name')} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.parents.fields.email')}</label>
            <Input type="email" error={errors.email?.message} {...register('email')} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.parents.fields.phone')}</label>
            <Input type="tel" {...register('phone')} />
          </div>
        </div>

        {!parent && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.parents.fields.password')}</label>
            <Input type="password" error={errors.password?.message} {...register('password')} />
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.parents.fields.students')}</label>
          {studentsLoading ? (
            <div className="flex justify-center py-6">
              <Spinner size="sm" />
            </div>
          ) : (
            <div className="grid gap-2 rounded-xl border border-[rgba(212,181,158,0.15)] p-3 sm:grid-cols-2">
              {students.map((student) => (
                <label key={student.id} className="flex items-center gap-2 text-sm text-[#F9F6F0] cursor-pointer">
                  <Checkbox checked={studentIds.includes(student.id)} onChange={() => toggleStudent(student.id)} />
                  {student.name}
                </label>
              ))}
            </div>
          )}
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
