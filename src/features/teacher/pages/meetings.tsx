import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import { MeetingsGrid } from '@/features/teacher/components/Meetings';

export function TeacherMeetingsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <PageHeader title={t('meetings.title')} description={t('meetings.teacherDescription')} />
      <MeetingsGrid />
    </div>
  );
}
