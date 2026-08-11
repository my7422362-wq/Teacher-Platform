import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import { MyAttendance } from '@/features/student/components/Dashboard';

export function StudentAttendancePage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('studentPages.attendance.title')}
        description={t('studentPages.attendance.description')}
      />
      <MyAttendance />
    </div>
  );
}
