import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Textarea } from '@/components/ui';
import { createPlatformSettingsSchema, type PlatformSettingsFormValues } from './schemas';
import { getPlatformSettings, savePlatformSettings } from './platform-settings-store';

export function PlatformInfoForm() {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const schema = useMemo(() => createPlatformSettingsSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlatformSettingsFormValues>({
    resolver: zodResolver(schema),
    defaultValues: getPlatformSettings(),
  });

  const onSubmit = async (values: PlatformSettingsFormValues) => {
    setSubmitting(true);
    try {
      savePlatformSettings(values);
      toast.success(t('teacherPages.settings.toast.platformUpdated'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('teacherPages.settings.platformTitle')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.settings.fields.platformName')}</label>
            <Input error={errors.name?.message} {...register('name')} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">
              {t('teacherPages.settings.fields.platformDescription')}
            </label>
            <Textarea rows={3} error={errors.description?.message} {...register('description')} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#F9F6F0]">
                {t('teacherPages.settings.fields.contactEmail')}
              </label>
              <Input type="email" error={errors.contactEmail?.message} {...register('contactEmail')} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#F9F6F0]">
                {t('teacherPages.settings.fields.contactPhone')}
              </label>
              <Input type="tel" error={errors.contactPhone?.message} {...register('contactPhone')} />
            </div>
          </div>

          <Button type="submit" loading={submitting} className="bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]">
            {t('teacherPages.settings.saveChanges')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
