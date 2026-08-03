import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import { ProfileInfoForm, ChangePasswordForm } from '@/features/student/components/Profile';

export function StudentProfilePage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader
        title={t('studentPages.profile.title')}
        description={t('studentPages.profile.description')}
      />
      <ProfileInfoForm />
      <ChangePasswordForm />
    </div>
  );
}

