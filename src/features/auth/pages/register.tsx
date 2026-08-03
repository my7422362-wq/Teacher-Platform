import { useTranslation } from 'react-i18next';
import { AuthCard, RegisterForm } from '@/features/auth';

export function RegisterPage() {
  const { t } = useTranslation();

  return (
    <AuthCard title={t('auth.register.title')} description={t('auth.register.description')}>
      <RegisterForm />
    </AuthCard>
  );
}
