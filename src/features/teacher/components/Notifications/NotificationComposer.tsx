import { useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Button, Input, Textarea, Select, type SelectOption } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Send } from 'lucide-react';
import { createComposeSchema, type ComposeSchemaValues } from './schemas';
import { sendNotification, type RecipientScope } from './data';
import { getTeacherGroups } from '@/features/teacher/components/Attendance/data';
import { getTeacherStudents } from '@/features/teacher/components/Students/data';

const DEFAULT_VALUES: ComposeSchemaValues = {
  scope: 'all',
  title: '',
  message: '',
  type: 'info',
};

const SCOPES: { value: RecipientScope; labelKey: string }[] = [
  { value: 'all', labelKey: 'teacherPages.notifications.scopeAll' },
  { value: 'group', labelKey: 'teacherPages.notifications.scopeGroup' },
  { value: 'student', labelKey: 'teacherPages.notifications.scopeStudent' },
];

export function NotificationComposer({ onSent }: { onSent: () => void }) {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const schema = useMemo(() => createComposeSchema(t), [t]);
  const groups = useMemo(() => getTeacherGroups(), []);
  const students = useMemo(() => getTeacherStudents(), []);

  const groupOptions: SelectOption[] = groups.map((g) => ({ value: String(g.id), label: g.name }));
  const studentOptions: SelectOption[] = students.map((s) => ({ value: String(s.id), label: s.name }));
  const typeOptions: SelectOption[] = [
    { value: 'info', label: t('teacherPages.notifications.typeInfo') },
    { value: 'success', label: t('teacherPages.notifications.typeSuccess') },
    { value: 'warning', label: t('teacherPages.notifications.typeWarning') },
    { value: 'error', label: t('teacherPages.notifications.typeError') },
  ];

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ComposeSchemaValues>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  });

  const scope = watch('scope');

  const onSubmit = async (values: ComposeSchemaValues) => {
    setSubmitting(true);
    try {
      const count = sendNotification(values);
      toast.success(t('teacherPages.notifications.sentToast', { count }));
      reset(DEFAULT_VALUES);
      onSent();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <h2 className="text-lg font-semibold text-[#F9F6F0]">{t('teacherPages.notifications.composeTitle')}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.notifications.scope')}</label>
            <div className="grid grid-cols-3 gap-3">
              {SCOPES.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setValue('scope', option.value)}
                  className={cn(
                    'rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors',
                    scope === option.value
                      ? 'border-[#D4B59E] bg-[#D4B59E] text-[#0F2520]'
                      : 'border-[rgba(212,181,158,0.25)] bg-transparent text-[#F9F6F0] hover:bg-[#16342D]'
                  )}
                >
                  {t(option.labelKey)}
                </button>
              ))}
            </div>
          </div>

          {scope === 'group' && (
            <Controller
              control={control}
              name="groupId"
              render={({ field }) => (
                <Select
                  label={t('teacherPages.notifications.selectGroup')}
                  options={groupOptions}
                  value={field.value ? String(field.value) : ''}
                  onChange={(v) => field.onChange(Number(v))}
                  error={errors.groupId?.message}
                />
              )}
            />
          )}

          {scope === 'student' && (
            <Controller
              control={control}
              name="studentId"
              render={({ field }) => (
                <Select
                  label={t('teacherPages.notifications.selectStudent')}
                  options={studentOptions}
                  value={field.value ? String(field.value) : ''}
                  onChange={(v) => field.onChange(Number(v))}
                  error={errors.studentId?.message}
                />
              )}
            />
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.notifications.titleField')}</label>
            <Input error={errors.title?.message} {...register('title')} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.notifications.messageField')}</label>
            <Textarea rows={3} error={errors.message?.message} {...register('message')} />
          </div>

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select
                label={t('teacherPages.notifications.typeField')}
                options={typeOptions}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Button type="submit" loading={submitting} className="bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]">
            <Send className="h-4 w-4" />
            {t('teacherPages.notifications.send')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
