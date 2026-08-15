import axios from 'axios';
import api from '@/services/api';
import i18n from '@/i18n/config';
import { studentService } from './student.service';
import type { TeacherPayment, TeacherInstallment } from '@/features/teacher/components/Payments/types';

interface PaymentUserDto {
  id: number;
  name: string;
}

interface PaymentCourseDto {
  id: number;
  title: string;
}

interface PaymentDto {
  id: number;
  user: PaymentUserDto;
  course?: PaymentCourseDto | null;
  course_id?: number | null;
  amount: string | number;
  payment_method: string;
  sender_phone?: string | null;
  status: 'pending' | 'approved' | 'rejected';
  receipt_path: string | null;
  approved_at: string | null;
  created_at: string | null;
}

/** Laravel's public disk serves files under /storage — receipt_path is
 *  stored as a bare relative path (e.g. "receipts/xxx.jpg"), so it needs
 *  the app's origin prefixed to be viewable. Falls back to using the value
 *  as-is if the backend ever starts returning an absolute URL instead. */
function resolveFileUrl(path: string | null): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  const origin = (import.meta.env.VITE_API_BASE_URL as string).replace(/\/api\/?$/, '');
  return `${origin}/storage/${path.replace(/^\/?storage\//, '')}`;
}

interface InstallmentCourseDto {
  id: number;
  title: string;
  currency: string;
}

interface InstallmentDto {
  id: number;
  student_id: number;
  course: InstallmentCourseDto;
  amount: string | number;
  due_date: string;
  status: string;
  paid_at: string | null;
}

function extractErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    if (data?.message) return data.message;
  }
  return fallback;
}

export const paymentService = {
  async list(): Promise<TeacherPayment[]> {
    try {
      const { data } = await api.get<{ data: PaymentDto[] }>('/payments');
      return data.data.map((p) => ({
        id: p.id,
        studentId: p.user.id,
        studentName: p.user.name,
        courseId: p.course?.id ?? p.course_id ?? null,
        courseTitle: p.course?.title ?? null,
        amount: Number(p.amount),
        paymentMethod: p.payment_method,
        senderPhone: p.sender_phone ?? null,
        status: p.status,
        receiptUrl: resolveFileUrl(p.receipt_path),
        approvedAt: p.approved_at,
        createdAt: p.created_at,
      }));
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.payments.toast.loadFailed')));
    }
  },

  /** POST /payments — student submits a payment (with receipt) for a
   *  specific course. Enrollment is intentionally NOT granted here; it
   *  only happens once a teacher approves the payment (see `approve`). */
  async submit(
    courseId: number,
    amount: number,
    paymentMethod: string,
    senderPhone: string,
    receipt: File
  ): Promise<void> {
    try {
      const formData = new FormData();
      formData.append('course_id', String(courseId));
      formData.append('amount', String(amount));
      formData.append('payment_method', paymentMethod);
      formData.append('sender_phone', senderPhone);
      formData.append('receipt', receipt);
      await api.post('/payments', formData, { timeout: 2 * 60 * 1000 });
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('studentPages.payments.toast.submitFailed')));
    }
  },

  async approve(paymentId: number): Promise<void> {
    try {
      await api.put(`/payments/${paymentId}/approve`);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.payments.toast.approveFailed')));
    }
  },

  async reject(paymentId: number): Promise<void> {
    try {
      await api.put(`/payments/${paymentId}/reject`);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.payments.toast.rejectFailed')));
    }
  },

  /** There's no global "list all installments" endpoint — only
   *  GET /students/{id}/installments — so this aggregates across the
   *  real student roster. Read-only: the backend exposes no mark-paid
   *  or reminder endpoint for installments. */
  async listAllInstallments(): Promise<TeacherInstallment[]> {
    try {
      const students = await studentService.list();
      const now = Date.now();
      const perStudent = await Promise.all(
        students.map((student) =>
          api
            .get<{ data: InstallmentDto[] }>(`/students/${student.id}/installments`)
            .then((res) =>
              res.data.data.map(
                (inst): TeacherInstallment => ({
                  id: inst.id,
                  studentId: student.id,
                  studentName: student.name,
                  studentAvatar: student.avatar,
                  courseTitle: inst.course.title,
                  amount: Number(inst.amount),
                  currency: inst.course.currency,
                  dueDate: inst.due_date,
                  status: inst.status,
                  paidAt: inst.paid_at,
                  isOverdue: inst.status !== 'paid' && new Date(inst.due_date).getTime() < now,
                })
              )
            )
            .catch(() => [] as TeacherInstallment[])
        )
      );
      return perStudent.flat().sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.payments.toast.loadFailed')));
    }
  },
};
