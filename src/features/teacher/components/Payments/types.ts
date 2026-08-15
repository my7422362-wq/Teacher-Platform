/**
 * Real backend constraints: there's no global "list all installments"
 * endpoint (only GET /students/{student}/installments), and no
 * mark-as-paid or send-reminder endpoint at all — installments are
 * read-only from the teacher side. Payments approve/reject routes exist
 * (PUT /payments/{id}/approve|reject) but role access wasn't confirmed —
 * verify the teacher account isn't rejected with 403 before relying on it.
 */

export interface TeacherInstallment {
  id: number;
  studentId: number;
  studentName: string;
  studentAvatar: string | null;
  courseTitle: string;
  amount: number;
  currency: string;
  dueDate: string;
  status: string;
  paidAt: string | null;
  isOverdue: boolean;
}

export interface TeacherPayment {
  id: number;
  studentId: number;
  studentName: string;
  courseId: number | null;
  courseTitle: string | null;
  amount: number;
  paymentMethod: string;
  senderPhone: string | null;
  status: 'pending' | 'approved' | 'rejected';
  receiptUrl: string | null;
  approvedAt: string | null;
  createdAt: string | null;
}
