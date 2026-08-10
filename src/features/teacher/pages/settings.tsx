import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import { TeacherAccountForm, LanguageSection } from '@/features/teacher/components/Settings';
import { ChangePasswordForm } from '@/features/student/components/Profile';

export function TeacherSettingsPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader title={t('teacherPages.settings.title')} description={t('teacherPages.settings.description')} />
      <TeacherAccountForm />
      <ChangePasswordForm />
      <LanguageSection />
    </div>
  );
}
