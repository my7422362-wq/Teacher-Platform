import { useParams } from 'react-router-dom';
import {
  getStudentDetail,
  StudentDetailHeader,
  EnrolledCourses,
  AttendanceSummary,
  StudentGrades,
  StudentNotes,
} from '@/features/teacher/components/Students';

export function TeacherStudentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const detail = getStudentDetail(Number(id));

  if (!detail) {
    return null;
  }

  return (
    <div className="space-y-8">
      <StudentDetailHeader student={detail.student} />

      <div className="grid gap-8 lg:grid-cols-2">
        <EnrolledCourses courses={detail.courses} />
        <AttendanceSummary attendance={detail.attendance} />
      </div>

      <StudentGrades grades={detail.grades} />
      <StudentNotes studentId={detail.student.id} notes={detail.notes} />
    </div>
  );
}
