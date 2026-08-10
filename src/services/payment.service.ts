import axios from 'axios';
import api from '@/services/api';
import i18n from '@/i18n/config';
import { studentService } from './student.service';
import type { TeacherPayment, TeacherInstallment } from '@/features/teacher/components/Payments/types';

interface PaymentUserDto {
  id: number;
  name: string;
}

interface PaymentDto {
  id: number;
  user: PaymentUserDto;
  amount: string | number;
  payment_method: string;
  status: 'pending' | 'approved' | 'rejected';
  receipt_path: string | null;
  approved_at: string | null;
  created_at: string | null;
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
        amount: Number(p.amount),
        paymentMethod: p.payment_method,
        status: p.status,
        receiptPath: p.receipt_path,
        approvedAt: p.approved_at,
        createdAt: p.created_at,
      }));
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.payments.toast.loadFailed')));
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
