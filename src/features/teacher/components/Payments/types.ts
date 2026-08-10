/**
 * Real backend constraints: there's no global "list all installments"
 * endpoint (only GET /students/{student}/installments), and no
 * mark-as-paid or send-reminder endpoint at all — installments are
 * read-only from the teacher side. Payments have no course reference in
 * PaymentResource, and approve/reject are admin-only (not exposed here).
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
  amount: number;
  paymentMethod: string;
  status: 'pending' | 'approved' | 'rejected';
  receiptPath: string | null;
  approvedAt: string | null;
  createdAt: string | null;
}
