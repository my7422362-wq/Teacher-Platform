import { mockStudents, mockCourses, mockPayments } from '@/mock';
import { getInstallments } from './installment-store';
import { saveNotification } from '@/features/notifications';
import type { Installment, PaymentRequest, Notification } from '@/types';

export interface InstallmentRow extends Installment {
  studentName: string;
  studentAvatar: string;
  courseName: string;
  isOverdue: boolean;
}

export function getInstallmentRows(): InstallmentRow[] {
  const now = Date.now();

  return getInstallments()
    .map((installment) => ({
      ...installment,
      studentName: mockStudents.find((s) => s.id === installment.studentId)?.name ?? '',
      studentAvatar: mockStudents.find((s) => s.id === installment.studentId)?.avatar ?? '',
      courseName: mockCourses.find((c) => c.id === installment.courseId)?.title ?? '',
      isOverdue: installment.status === 'pending' && new Date(installment.dueDate).getTime() < now,
    }))
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
}

export interface PaymentRow extends PaymentRequest {
  studentName: string;
  courseName: string;
}

export function getPaymentRows(): PaymentRow[] {
  return mockPayments
    .map((payment) => ({
      ...payment,
      studentName: mockStudents.find((s) => s.id === payment.userId)?.name ?? '',
    }))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export interface PaymentsOverview {
  totalCollected: number;
  totalPending: number;
  totalOverdue: number;
  overdueCount: number;
}

export function getPaymentsOverview(): PaymentsOverview {
  const installments = getInstallmentRows();
  const onceOffPayments = mockPayments;

  const totalCollected =
    installments.filter((i) => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0) +
    onceOffPayments.filter((p) => p.status === 'approved').reduce((sum, p) => sum + p.amount, 0);

  const totalPending =
    installments.filter((i) => i.status === 'pending' && !i.isOverdue).reduce((sum, i) => sum + i.amount, 0) +
    onceOffPayments.filter((p) => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

  const overdueInstallments = installments.filter((i) => i.isOverdue);
  const totalOverdue = overdueInstallments.reduce((sum, i) => sum + i.amount, 0);

  return {
    totalCollected,
    totalPending,
    totalOverdue,
    overdueCount: overdueInstallments.length,
  };
}

export function sendPaymentReminder(installment: InstallmentRow): void {
  const notification: Notification = {
    id: Date.now(),
    userId: installment.studentId,
    title: 'تذكير بموعد سداد قسط',
    message: `قسط رقم ${installment.installmentNumber} من ${installment.totalInstallments} لكورس "${installment.courseName}" بقيمة ${installment.amount} ${installment.currency} ${installment.isOverdue ? 'متأخر عن موعده' : 'مستحق قريبًا'}.`,
    type: installment.isOverdue ? 'error' : 'warning',
    isRead: false,
    createdAt: new Date().toISOString(),
  };
  saveNotification(notification);
}
