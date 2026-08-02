import { useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Input, Select, Checkbox, type SelectOption } from '@/components/ui';
import { Plus, Trash2 } from 'lucide-react';
import { createGroupSchema, type GroupSchemaValues } from './schemas';
import { createGroup, updateGroup } from './group-store';
import { getCourses } from '@/features/teacher/components/Courses/course-store';
import { getTeacherStudents } from '@/features/teacher/components/Students/data';
import { currentTeacher } from '@/features/teacher/components/Dashboard';
import type { Group, GroupScheduleSlot } from '@/types';

const DAY_KEYS: GroupScheduleSlot['day'][] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

const DEFAULT_VALUES: GroupSchemaValues = {
  name: '',
  courseId: 0,
  studentIds: [],
  schedule: [{ day: 'sunday', startTime: '16:00', endTime: '17:30' }],
};

interface GroupFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: Group | null;
  onSaved: () => void;
}

export function GroupFormModal({ isOpen, onClose, group, onSaved }: GroupFormModalProps) {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const schema = useMemo(() => createGroupSchema(t), [t]);
  const courses = useMemo(() => getCourses(), []);
  const students = useMemo(() => getTeacherStudents(), []);

  const courseOptions: SelectOption[] = courses.map((c) => ({ value: String(c.id), label: c.title }));
  const dayOptions: SelectOption[] = DAY_KEYS.map((day) => ({ value: day, label: t(`teacherPages.groups.days.${day}`) }));

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<GroupSchemaValues>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  });

  const studentIds = watch('studentIds');
  const schedule = watch('schedule');

  useEffect(() => {
    if (!isOpen) return;
    reset(
      group
        ? {
            name: group.name,
            courseId: group.courseId,
            studentIds: group.studentIds,
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

  function addSlot() {
    setValue('schedule', [...schedule, { day: 'sunday', startTime: '16:00', endTime: '17:30' }]);
  }

  function removeSlot(index: number) {
    setValue(
      'schedule',
      schedule.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
  }

  function updateSlot(index: number, patch: Partial<GroupScheduleSlot>) {
    setValue(
      'schedule',
      schedule.map((slot, i) => (i === index ? { ...slot, ...patch } : slot))
    );
  }

  const onSubmit = async (values: GroupSchemaValues) => {
    setSubmitting(true);
    try {
      if (group) {
        updateGroup(group.id, values);
        toast.success(t('teacherPages.groups.toast.updated'));
      } else {
        createGroup(values, currentTeacher.id);
        toast.success(t('teacherPages.groups.toast.created'));
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
      title={group ? t('teacherPages.groups.editGroup') : t('teacherPages.groups.addGroup')}
      size="xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="max-h-[70vh] space-y-5 overflow-y-auto pe-1" noValidate>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.groups.fields.name')}</label>
          <Input error={errors.name?.message} {...register('name')} />
        </div>

        <Controller
          control={control}
          name="courseId"
          render={({ field }) => (
            <Select
              label={t('teacherPages.groups.fields.course')}
              options={courseOptions}
              value={field.value ? String(field.value) : ''}
              onChange={(v) => field.onChange(Number(v))}
              error={errors.courseId?.message}
            />
          )}
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.groups.fields.schedule')}</label>
            <Button type="button" variant="outline" size="sm" onClick={addSlot}>
              <Plus className="h-3.5 w-3.5" />
              {t('teacherPages.groups.addSlot')}
            </Button>
          </div>
          {errors.schedule?.message && <p className="text-sm text-destructive">{errors.schedule.message}</p>}
          <div className="space-y-3">
            {schedule.map((slot, index) => (
              <div key={index} className="grid grid-cols-[1fr_auto_auto_auto] items-end gap-2 rounded-xl border border-[rgba(212,181,158,0.15)] p-3">
                <Select
                  label={t('teacherPages.groups.day')}
                  options={dayOptions}
                  value={slot.day}
                  onChange={(v) => updateSlot(index, { day: v as GroupScheduleSlot['day'] })}
                />
                <div className="space-y-2">
                  <label className="text-xs text-[rgba(249,246,240,0.55)]">{t('teacherPages.groups.startTime')}</label>
                  <Input
                    type="time"
                    value={slot.startTime}
                    onChange={(e) => updateSlot(index, { startTime: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-[rgba(249,246,240,0.55)]">{t('teacherPages.groups.endTime')}</label>
                  <Input
                    type="time"
                    value={slot.endTime}
                    onChange={(e) => updateSlot(index, { endTime: e.target.value })}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => removeSlot(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.groups.fields.students')}</label>
          {errors.studentIds?.message && <p className="text-sm text-destructive">{errors.studentIds.message}</p>}
          <div className="grid gap-2 rounded-xl border border-[rgba(212,181,158,0.15)] p-3 sm:grid-cols-2">
            {students.map((student) => (
              <label key={student.id} className="flex items-center gap-2 text-sm text-[#F9F6F0] cursor-pointer">
                <Checkbox checked={studentIds.includes(student.id)} onChange={() => toggleStudent(student.id)} />
                {student.name}
              </label>
            ))}
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
