import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/page-header';
import { AttendanceTaker } from '@/features/teacher/components/Attendance';

export function TeacherAttendancePage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader title={t('teacherPages.attendance.title')} description={t('teacherPages.attendance.description')} />
      <AttendanceTaker />
    </div>
  );
}
