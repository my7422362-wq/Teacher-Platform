import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Button, Input, Checkbox } from '@/components/ui';
import { PasswordInput } from './PasswordInput';
import { createLoginSchema, type LoginFormValues } from '../schemas';
import { useAuth } from '@/providers';
import { sessionService } from '@/services/session.service';
import type { AuthRole } from '../types';

const ROLE_HOME: Record<AuthRole, string> = {
  student: '/student/dashboard',
  teacher: '/teacher/dashboard',
  guest: '/',
};

export function LoginForm() {
  const { t } = useTranslation();
  const { login, loginAsGuest } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);

  const rememberedEmail = sessionService.getRememberedEmail();
  const loginSchema = useMemo(() => createLoginSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: rememberedEmail,
      password: '',
      remember: rememberedEmail.length > 0,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setSubmitting(true);
    try {
      const user = await login(values);
      toast.success(t('auth.toast.loginSuccess'));
      const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
      navigate(from || ROLE_HOME[user.role], { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('auth.toast.loginInvalid'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGuest = () => {
    loginAsGuest();
    toast.success(t('auth.toast.guestSuccess'));
    navigate('/', { replace: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#F9F6F0]">{t('auth.login.email')}</label>
        <Input
          type="email"
          placeholder="example@email.com"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#F9F6F0]">{t('auth.login.password')}</label>
        <PasswordInput placeholder="********" error={errors.password?.message} {...register('password')} />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-[rgba(249,246,240,0.75)] cursor-pointer">
          <Checkbox {...register('remember')} />
          {t('auth.login.remember')}
        </label>
        <Link to="/forgot-password" className="text-sm text-[#D4B59E] hover:underline">
          {t('auth.login.forgotPassword')}
        </Link>
      </div>

      <Button
        type="submit"
        loading={submitting}
        className="w-full bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]"
      >
        {t('auth.login.submit')}
      </Button>

      <div className="relative flex items-center py-1">
        <div className="flex-1 border-t border-[rgba(212,181,158,0.15)]" />
        <span className="px-3 text-xs text-[rgba(249,246,240,0.45)]">{t('auth.login.or')}</span>
        <div className="flex-1 border-t border-[rgba(212,181,158,0.15)]" />
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={handleGuest}
        className="w-full border-[rgba(212,181,158,0.25)] bg-transparent text-[#F9F6F0] hover:bg-[#16342D]"
      >
        {t('auth.login.guest')}
      </Button>

      <p className="text-center text-sm text-[rgba(249,246,240,0.55)]">
        {t('auth.login.noAccount')}{' '}
        <Link to="/register" className="text-[#D4B59E] hover:underline">
          {t('auth.login.createAccount')}
        </Link>
      </p>
    </form>
  );
}
