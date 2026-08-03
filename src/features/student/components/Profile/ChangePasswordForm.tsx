import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button } from '@/components/ui';
import { PasswordInput } from '@/features/auth/components/PasswordInput';
import { useAuth } from '@/providers';
import { createChangePasswordSchema, type ChangePasswordFormValues } from './schemas';

export function ChangePasswordForm() {
  const { t } = useTranslation();
  const { changePassword } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const schema = useMemo(() => createChangePasswordSchema(t), [t]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { currentPassword: '', newPassword: '', confirmNewPassword: '' },
  });

  const onSubmit = async (values: ChangePasswordFormValues) => {
    setSubmitting(true);
    try {
      await changePassword(values.currentPassword, values.newPassword);
      toast.success(t('studentPages.profile.toast.passwordChangeSuccess'));
      reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t('studentPages.profile.toast.passwordChangeFailed')
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('studentPages.profile.changePasswordTitle')}</CardTitle>
        <CardDescription>{t('studentPages.profile.changePasswordDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">
              {t('studentPages.profile.currentPassword')}
            </label>
            <PasswordInput error={errors.currentPassword?.message} {...register('currentPassword')} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">
              {t('studentPages.profile.newPassword')}
            </label>
            <PasswordInput error={errors.newPassword?.message} {...register('newPassword')} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">
              {t('studentPages.profile.confirmNewPassword')}
            </label>
            <PasswordInput
              error={errors.confirmNewPassword?.message}
              {...register('confirmNewPassword')}
            />
          </div>

          <Button
            type="submit"
            loading={submitting}
            className="bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]"
          >
            {t('studentPages.profile.changePasswordSubmit')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

