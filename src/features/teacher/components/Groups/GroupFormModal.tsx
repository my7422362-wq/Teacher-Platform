import { useEffect, useMemo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Plus, Trash2 } from 'lucide-react';
import { Modal, Button, Input, Textarea, Checkbox, Select, Spinner } from '@/components/ui';
import { createGroupSchema, type GroupSchemaValues } from './schemas';
import { useStudentsList, useCreateGroup, useUpdateGroup } from './queries';
import type { TeacherGroup, ScheduleDay } from './types';

const DEFAULT_VALUES: GroupSchemaValues = { name: '', description: '', studentIds: [], schedule: [] };

const DAY_OPTIONS: { value: ScheduleDay; labelKey: string }[] = [
  { value: 'saturday', labelKey: 'saturday' },
  { value: 'sunday', labelKey: 'sunday' },
  { value: 'monday', labelKey: 'monday' },
  { value: 'tuesday', labelKey: 'tuesday' },
  { value: 'wednesday', labelKey: 'wednesday' },
  { value: 'thursday', labelKey: 'thursday' },
  { value: 'friday', labelKey: 'friday' },
];

interface GroupFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: TeacherGroup | null;
}

export function GroupFormModal({ isOpen, onClose, group }: GroupFormModalProps) {
  const { t } = useTranslation();
  const schema = useMemo(() => createGroupSchema(t), [t]);
  const { data: students = [], isLoading: studentsLoading } = useStudentsList();
  const createGroup = useCreateGroup();
  const updateGroup = useUpdateGroup();
  const submitting = createGroup.isPending || updateGroup.isPending;

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<GroupSchemaValues>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  });

  const { fields: scheduleFields, append: appendSlot, remove: removeSlot } = useFieldArray({
    control,
    name: 'schedule',
  });

  const studentIds = watch('studentIds');

  useEffect(() => {
    if (!isOpen) return;
    reset(
      group
        ? {
            name: group.name,
            description: group.description ?? '',
            studentIds: group.students.map((s) => s.id),
            schedule: group.schedule,
          }
        : DEFAULT_VALUES
    );
  }, [isOpen, group, reset]);

  function toggleStudent(id: number) {
    setValue(
      'studentIds',
      studentIds.includes(id) ? studentIds.filter((s) => s !== id) : [...studentIds, id],
      { shouldValidate: true }
    );
  }

  const onSubmit = async (values: GroupSchemaValues) => {
    try {
      if (group) {
        await updateGroup.mutateAsync({ groupId: group.id, values });
        toast.success(t('teacherPages.groups.toast.updated'));
      } else {
        await createGroup.mutateAsync(values);
        toast.success(t('teacherPages.groups.toast.created'));
      }
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('teacherPages.groups.toast.saveFailed'));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={group ? t('teacherPages.groups.editGroup') : t('teacherPages.groups.addGroup')}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="max-h-[70vh] space-y-5 overflow-y-auto pe-1" noValidate>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.groups.fields.name')}</label>
          <Input error={errors.name?.message} {...register('name')} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.groups.fields.description')}</label>
          <Textarea rows={2} {...register('description')} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.groups.fields.students')}</label>
          {errors.studentIds?.message && <p className="text-sm text-destructive">{errors.studentIds.message}</p>}
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

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.groups.fields.schedule')}</label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendSlot({ day: 'sunday', startTime: '', endTime: '' })}
            >
              <Plus className="h-3.5 w-3.5" />
              {t('teacherPages.groups.addScheduleSlot')}
            </Button>
          </div>

          {scheduleFields.length === 0 ? (
            <p className="rounded-xl border border-dashed border-[rgba(212,181,158,0.18)] p-4 text-center text-sm text-[rgba(249,246,240,0.45)]">
              {t('teacherPages.groups.noScheduleSlots')}
            </p>
          ) : (
            <div className="space-y-2">
              {scheduleFields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-2">
                  <Select
                    label={index === 0 ? t('teacherPages.groups.fields.day') : undefined}
                    options={DAY_OPTIONS.map((d) => ({ value: d.value, label: t(`teacherPages.groups.days.${d.labelKey}`) }))}
                    value={watch(`schedule.${index}.day`)}
                    onChange={(value) => setValue(`schedule.${index}.day`, value as ScheduleDay)}
                  />
                  <div className="space-y-1.5">
                    {index === 0 && (
                      <label className="block text-sm font-medium text-[#F9F6F0]">
                        {t('teacherPages.groups.fields.startTime')}
                      </label>
                    )}
                    <Input type="time" {...register(`schedule.${index}.startTime`)} />
                  </div>
                  <div className="space-y-1.5">
                    {index === 0 && (
                      <label className="block text-sm font-medium text-[#F9F6F0]">
                        {t('teacherPages.groups.fields.endTime')}
                      </label>
                    )}
                    <Input type="time" {...register(`schedule.${index}.endTime`)} />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => removeSlot(index)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
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
