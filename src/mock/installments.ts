import type { Installment } from '@/types';

function daysFromNow(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

export const mockInstallments: Installment[] = [
  {
    id: 1,
    studentId: 3,
    courseId: 4,
    installmentNumber: 1,
    totalInstallments: 3,
    amount: 83,
    currency: 'SAR',
    dueDate: daysFromNow(-60),
    status: 'paid',
    paidAt: daysFromNow(-60),
    paymentMethod: 'cash',
  },
  {
    id: 2,
    studentId: 3,
    courseId: 4,
    installmentNumber: 2,
    totalInstallments: 3,
    amount: 83,
    currency: 'SAR',
    dueDate: daysFromNow(-5),
    status: 'pending',
  },
  {
    id: 3,
    studentId: 3,
    courseId: 4,
    installmentNumber: 3,
    totalInstallments: 3,
    amount: 83,
    currency: 'SAR',
    dueDate: daysFromNow(25),
    status: 'pending',
  },
  {
    id: 4,
    studentId: 4,
    courseId: 6,
    installmentNumber: 1,
    totalInstallments: 2,
    amount: 225,
    currency: 'SAR',
    dueDate: daysFromNow(-30),
    status: 'paid',
    paidAt: daysFromNow(-30),
    paymentMethod: 'credit_card',
  },
  {
    id: 5,
    studentId: 4,
    courseId: 6,
    installmentNumber: 2,
    totalInstallments: 2,
    amount: 224,
    currency: 'SAR',
    dueDate: daysFromNow(3),
    status: 'pending',
  },
];
