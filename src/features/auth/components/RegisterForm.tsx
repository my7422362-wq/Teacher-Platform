import { useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Button, Input, Select, type SelectOption } from '@/components/ui';
import { PasswordInput } from './PasswordInput';
import { createRegisterSchema, type RegisterFormValues } from '../schemas';
import { GRADE_OPTIONS, GOVERNORATE_OPTIONS } from '../data/education';
import { useAuth } from '@/app/providers';
import { cn } from '@/lib/utils';

export function RegisterForm() {
  const { t } = useTranslation();
  const { register: registerAccount } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const registerSchema = useMemo(() => createRegisterSchema(t), [t]);
  const gradeOptions: SelectOption[] = useMemo(
    () => GRADE_OPTIONS.map((opt) => ({ value: opt.value, label: t(opt.labelKey) })),
    [t]
  );
  const governorateOptions: SelectOption[] = useMemo(
    () => GOVERNORATE_OPTIONS.map((opt) => ({ value: opt.value, label: t(opt.labelKey) })),
    [t]
  );

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      role: 'student',
      grade: '',
      governorate: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const role = watch('role');

  const onSubmit = async (values: RegisterFormValues) => {
    setSubmitting(true);
    try {
      await registerAccount(values);
      toast.success(t('auth.toast.registerSuccess'));
      navigate(`/${values.role}/dashboard`, { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('auth.toast.registerFailed'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#F9F6F0]">{t('auth.register.iAm')}</label>
        <div className="grid grid-cols-2 gap-3">
          {(['student', 'teacher'] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setValue('role', option);
                if (option === 'teacher') {
                  setValue('grade', '');
                  setValue('governorate', '');
                }
              }}
              className={cn(
                'rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors',
                role === option
                  ? 'border-[#D4B59E] bg-[#D4B59E] text-[#0F2520]'
                  : 'border-[rgba(212,181,158,0.25)] bg-transparent text-[#F9F6F0] hover:bg-[#16342D]'
              )}
            >
              {option === 'student' ? t('auth.register.roleStudent') : t('auth.register.roleTeacher')}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#F9F6F0]">{t('auth.register.fullName')}</label>
        <Input placeholder={t('auth.register.fullNamePlaceholder')} error={errors.name?.message} {...register('name')} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#F9F6F0]">{t('auth.register.email')}</label>
        <Input
          type="email"
          placeholder="example@email.com"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#F9F6F0]">{t('auth.register.phone')}</label>
        <Input
          type="tel"
          placeholder="01012345678"
          error={errors.phone?.message}
          {...register('phone')}
        />
      </div>

      {role === 'student' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Controller
            control={control}
            name="grade"
            render={({ field }) => (
              <Select
                label={t('auth.register.grade')}
                placeholder={t('auth.register.gradePlaceholder')}
                options={gradeOptions}
                value={field.value}
                onChange={field.onChange}
                error={errors.grade?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="governorate"
            render={({ field }) => (
              <Select
                label={t('auth.register.governorate')}
                placeholder={t('auth.register.governoratePlaceholder')}
                options={governorateOptions}
                value={field.value}
                onChange={field.onChange}
                error={errors.governorate?.message}
              />
            )}
          />
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#F9F6F0]">{t('auth.register.password')}</label>
        <PasswordInput placeholder="********" error={errors.password?.message} {...register('password')} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#F9F6F0]">{t('auth.register.confirmPassword')}</label>
        <PasswordInput
          placeholder="********"
          error={errors.passwordConfirmation?.message}
          {...register('passwordConfirmation')}
        />
      </div>

      <Button
        type="submit"
        loading={submitting}
        className="w-full bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]"
      >
        {t('auth.register.submit')}
      </Button>

      <p className="text-center text-sm text-[rgba(249,246,240,0.55)]">
        {t('auth.register.haveAccount')}{' '}
        <Link to="/login" className="text-[#D4B59E] hover:underline">
          {t('auth.register.login')}
        </Link>
      </p>
    </form>
  );
}
