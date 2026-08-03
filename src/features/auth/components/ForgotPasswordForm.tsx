import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '@/components/ui';
import { createForgotPasswordSchema, type ForgotPasswordFormValues } from '../schemas';
import { useAuth } from '@/providers';

export function ForgotPasswordForm() {
  const { t } = useTranslation();
  const { forgotPassword } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const forgotPasswordSchema = useMemo(() => createForgotPasswordSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setSubmitting(true);
    try {
      await forgotPassword(values.email);
      setSent(true);
      toast.success(t('auth.toast.forgotPasswordSuccess'));
    } catch {
      toast.error(t('auth.toast.forgotPasswordError'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#F9F6F0]">{t('auth.forgotPassword.email')}</label>
        <Input
          type="email"
          placeholder="example@email.com"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <Button
        type="submit"
        loading={submitting}
        className="w-full bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]"
      >
        {t('auth.forgotPassword.submit')}
      </Button>

      {sent && (
        <p className="text-center text-sm text-[#D4B59E]">
          {t('auth.forgotPassword.sentMessage')}
        </p>
      )}

      <p className="text-center text-sm text-[rgba(249,246,240,0.55)]">
        <Link to="/login" className="text-[#D4B59E] hover:underline">
          {t('auth.forgotPassword.backToLogin')}
        </Link>
      </p>
    </form>
  );
}

