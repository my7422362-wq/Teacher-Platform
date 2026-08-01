import { mockParents, mockPayments, mockCommunicationLog, mockStudents } from '@/mock';
import { getStudentDetail } from '../Students/data';
import { getLocalCommunicationLog } from './communication-store';
import type { AttendanceSummary, StudentGradeItem } from '../Students/data';
import type { CommunicationLogEntry, PaymentRequest } from '@/types';

export const CURRENT_TEACHER_ID = 1;

export interface ParentListItem {
  id: number;
  name: string;
  relationship: 'father' | 'mother' | 'guardian';
  email: string;
  phone: string;
  studentId: number;
  studentName: string;
}

export function getTeacherParents(): ParentListItem[] {
  return mockParents.map((parent) => ({
    id: parent.id,
    name: parent.name,
    relationship: parent.relationship,
    email: parent.email,
    phone: parent.phone,
    studentId: parent.studentId,
    studentName: mockStudents.find((s) => s.id === parent.studentId)?.name ?? '',
  }));
}

export interface ParentDetail {
  parent: ParentListItem;
  studentAvatar?: string;
  attendance: AttendanceSummary;
  grades: StudentGradeItem[];
  payments: (PaymentRequest & { courseName: string })[];
  communicationLog: CommunicationLogEntry[];
}

export function getParentDetail(parentId: number): ParentDetail | undefined {
  const parent = getTeacherParents().find((p) => p.id === parentId);
  if (!parent) return undefined;

  const studentDetail = getStudentDetail(parent.studentId);

  const payments = mockPayments
    .filter((p) => p.userId === parent.studentId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const communicationLog = [...mockCommunicationLog, ...getLocalCommunicationLog()]
    .filter((c) => c.parentId === parentId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    parent,
    studentAvatar: studentDetail?.student.avatar,
    attendance: studentDetail?.attendance ?? { rate: 0, totalSessions: 0, recent: [] },
    grades: studentDetail?.grades ?? [],
    payments,
    communicationLog,
  };
}
