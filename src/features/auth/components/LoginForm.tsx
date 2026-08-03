import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { ShieldCheck } from 'lucide-react';
import { Button, Input, Checkbox } from '@/components/ui';
import { PasswordInput } from './PasswordInput';
import { OtpInput } from './OtpInput';
import { createLoginSchema, type LoginFormValues } from '../schemas';
import { useAuth } from '@/providers';
import { sessionService } from '@/services/session.service';
import type { AuthRole, AuthUser } from '../types';

const ROLE_HOME: Record<AuthRole, string> = {
  student: '/student/dashboard',
  teacher: '/teacher/dashboard',
  guest: '/',
};

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

interface PendingLogin {
  user: AuthUser;
  token: string;
  remember: boolean;
  email: string;
}

export function LoginForm() {
  const { t } = useTranslation();
  const { requestLoginOtp, completeLogin, loginAsGuest } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [pendingLogin, setPendingLogin] = useState<PendingLogin | null>(null);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState<string | undefined>(undefined);
  const [verifying, setVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(RESEND_SECONDS);

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

  useEffect(() => {
    if (step !== 'otp' || resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [step, resendCooldown]);

  const onSubmit = async (values: LoginFormValues) => {
    setSubmitting(true);
    try {
      const { user, token } = await requestLoginOtp(values);
      setPendingLogin({ user, token, remember: values.remember, email: values.email });
      setOtp('');
      setOtpError(undefined);
      setResendCooldown(RESEND_SECONDS);
      setStep('otp');
      toast.success(t('auth.toast.otpSent'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('auth.toast.loginInvalid'));
    } finally {
      setSubmitting(false);
    }
  };

  const finishLogin = async (code: string) => {
    if (!pendingLogin) return;
    if (code.length < OTP_LENGTH) {
      setOtpError(t('auth.otp.incomplete'));
      return;
    }
    setVerifying(true);
    try {
      // FRONT-END MOCK: any 6-digit code is accepted — the backend will
      // replace this with a real verification call once it's wired up.
      const user = completeLogin(pendingLogin.user, pendingLogin.token, pendingLogin.remember, pendingLogin.email);
      toast.success(t('auth.toast.otpVerified'));
      const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
      navigate(from || ROLE_HOME[user.role], { replace: true });
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = () => {
    if (resendCooldown > 0) return;
    setOtp('');
    setOtpError(undefined);
    setResendCooldown(RESEND_SECONDS);
    toast.success(t('auth.toast.otpResent'));
  };

  const handleBackToCredentials = () => {
    setStep('credentials');
    setPendingLogin(null);
    setOtp('');
    setOtpError(undefined);
  };

  const handleGuest = () => {
    loginAsGuest();
    toast.success(t('auth.toast.guestSuccess'));
    navigate('/', { replace: true });
  };

  if (step === 'otp' && pendingLogin) {
    return (
      <div className="space-y-5">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#16342D] text-[#D4B59E]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-[#F9F6F0]">{t('auth.otp.title')}</h3>
          <p className="text-sm text-[rgba(249,246,240,0.6)]">
            {t('auth.otp.description', { email: pendingLogin.email })}
          </p>
        </div>

        <OtpInput
          length={OTP_LENGTH}
          value={otp}
          onChange={(value) => {
            setOtp(value);
            if (otpError) setOtpError(undefined);
          }}
          onComplete={finishLogin}
          error={otpError}
          disabled={verifying}
        />

        <p className="text-center text-xs text-[rgba(249,246,240,0.45)]">{t('auth.otp.demoHint')}</p>

        <Button
          type="button"
          loading={verifying}
          onClick={() => finishLogin(otp)}
          className="w-full bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]"
        >
          {t('auth.otp.submit')}
        </Button>

        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={handleBackToCredentials}
            className="text-[rgba(249,246,240,0.55)] hover:text-[#F9F6F0] hover:underline"
          >
            {t('auth.otp.back')}
          </button>
          <button
            type="button"
            onClick={handleResend}
            disabled={resendCooldown > 0}
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
