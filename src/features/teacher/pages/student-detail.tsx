import { useParams } from 'react-router-dom';
import { Spinner, ErrorState } from '@/components/ui';
import { useTranslation } from 'react-i18next';
import {
  useTeacherStudent,
  StudentDetailHeader,
  EnrolledCourses,
  AttendanceSummary,
  StudentNotes,
} from '@/features/teacher/components/Students';

export function TeacherStudentDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const studentId = Number(id);
  const { data: student, isLoading, isError, refetch } = useTeacherStudent(studentId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (isError || !student) {
    return <ErrorState description={t('teacherPages.students.toast.loadFailed')} onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-8">
      <StudentDetailHeader student={student} />

      <div className="grid gap-8 lg:grid-cols-2">
        <EnrolledCourses studentId={studentId} />
        <AttendanceSummary studentId={studentId} />
      </div>

      <StudentNotes studentId={studentId} />
    </div>
  );
}
