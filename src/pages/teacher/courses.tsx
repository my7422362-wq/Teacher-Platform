import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/page-header';

export function TeacherCoursesPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('teacherPages.courses.title')}
        description={t('teacherPages.courses.description')}
      />
    </div>
  );
}
