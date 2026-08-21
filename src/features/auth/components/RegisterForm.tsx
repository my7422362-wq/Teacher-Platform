import { useEffect, useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { ShieldCheck } from 'lucide-react';
import { Button, Input, Select, type SelectOption } from '@/components/ui';
import { PasswordInput } from './PasswordInput';
import { OtpInput } from './OtpInput';
import { createRegisterSchema, type RegisterFormValues } from '../schemas';
import { GRADE_OPTIONS, GOVERNORATE_OPTIONS } from '../data/education';
import { useAuth } from '@/providers';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

export function RegisterForm() {
  const { t } = useTranslation();
  const { requestRegisterOtp, resendRegisterOtp, completeRegister } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [pendingValues, setPendingValues] = useState<RegisterFormValues | null>(null);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState<string | undefined>(undefined);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(RESEND_SECONDS);

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

  useEffect(() => {
    if (step !== 'otp' || resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [step, resendCooldown]);

  const onSubmit = async (values: RegisterFormValues) => {
    setSubmitting(true);
    try {
      await requestRegisterOtp(values);
      setPendingValues(values);
      setOtp('');
      setOtpError(undefined);
      setResendCooldown(RESEND_SECONDS);
      setStep('otp');
      toast.success(t('auth.toast.otpSent'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('auth.toast.registerFailed'));
    } finally {
      setSubmitting(false);
    }
  };

  const finishRegister = async (code: string) => {
    if (!pendingValues) return;
    if (code.length < OTP_LENGTH) {
      setOtpError(t('auth.otp.incomplete'));
      return;
    }
    setVerifying(true);
    try {
      const user = await completeRegister(pendingValues, code);
      toast.success(t('auth.toast.registerSuccess'));
      navigate(`/${user.role}/dashboard`, { replace: true });
    } catch (error) {
      setOtpError(error instanceof Error ? error.message : t('auth.toast.registerFailed'));
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || !pendingValues || resending) return;
    setResending(true);
    try {
      await resendRegisterOtp(pendingValues.email);
      setOtp('');
      setOtpError(undefined);
      setResendCooldown(RESEND_SECONDS);
      toast.success(t('auth.toast.otpResent'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('auth.toast.genericError'));
    } finally {
      setResending(false);
    }
  };

  const handleBackToDetails = () => {
    setStep('details');
    setPendingValues(null);
    setOtp('');
    setOtpError(undefined);
  };

  if (step === 'otp' && pendingValues) {
    return (
      <div className="space-y-5">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#16342D] text-[#D4B59E]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-[#F9F6F0]">{t('auth.otp.title')}</h3>
          <p className="text-sm text-[rgba(249,246,240,0.6)]">
            {t('auth.otp.description', { email: pendingValues.email })}
          </p>
        </div>

        <OtpInput
          length={OTP_LENGTH}
          value={otp}
          onChange={(value) => {
            setOtp(value);
            if (otpError) setOtpError(undefined);
          }}
          onComplete={finishRegister}
          error={otpError}
          disabled={verifying}
        />

        <p className="text-center text-xs text-[rgba(249,246,240,0.45)]">{t('auth.otp.otpHint')}</p>

        <Button
          type="button"
          loading={verifying}
          onClick={() => finishRegister(otp)}
          className="w-full bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]"
        >
          {t('auth.otp.submit')}
        </Button>

        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={handleBackToDetails}
            className="text-[rgba(249,246,240,0.55)] hover:text-[#F9F6F0] hover:underline"
          >
            {t('auth.otp.back')}
          </button>
          <button
            type="button"
            onClick={handleResend}
            disabled={resendCooldown > 0 || resending}
            className="text-[#D4B59E] hover:underline disabled:cursor-not-allowed disabled:text-[rgba(249,246,240,0.35)] disabled:no-underline"
          >
            {resendCooldown > 0 ? t('auth.otp.resendIn', { seconds: resendCooldown }) : t('auth.otp.resend')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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
