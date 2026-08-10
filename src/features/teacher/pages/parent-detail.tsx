import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Spinner, ErrorState } from '@/components/ui';
import { useTeacherParent, ParentDetailHeader, CommunicationLog } from '@/features/teacher/components/Parents';
import { AttendanceSummary } from '@/features/teacher/components/Students';

export function TeacherParentDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const parentId = Number(id);
  const { data: parent, isLoading, isError, refetch } = useTeacherParent(parentId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (isError || !parent) {
    return <ErrorState description={t('teacherPages.parents.toast.loadFailed')} onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-8">
      <ParentDetailHeader parent={parent} />

      {parent.students.length > 0 && (
        <div className="grid gap-8 lg:grid-cols-2">
          {parent.students.map((student) => (
            <AttendanceSummary key={student.id} studentId={student.id} />
          ))}
        </div>
      )}

      <CommunicationLog parentId={parent.id} />
    </div>
  );
}
