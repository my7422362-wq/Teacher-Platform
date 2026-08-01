import { useParams } from 'react-router-dom';
import {
  getParentDetail,
  ParentDetailHeader,
  ParentPayments,
  CommunicationLog,
} from '@/features/teacher/components/Parents';
import { AttendanceSummary, StudentGrades } from '@/features/teacher/components/Students';

export function TeacherParentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const detail = getParentDetail(Number(id));

  if (!detail) {
    return null;
  }

  return (
    <div className="space-y-8">
      <ParentDetailHeader parent={detail.parent} studentAvatar={detail.studentAvatar} />

      <div className="grid gap-8 lg:grid-cols-2">
        <AttendanceSummary attendance={detail.attendance} />
        <StudentGrades grades={detail.grades} />
      </div>

      <ParentPayments payments={detail.payments} />
      <CommunicationLog parentId={detail.parent.id} entries={detail.communicationLog} />
    </div>
  );
}
