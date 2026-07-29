import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/page-header';

export function TeacherStudentsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('teacherPages.students.title')}
        description={t('teacherPages.students.description')}
      />
    </div>
  );
}
