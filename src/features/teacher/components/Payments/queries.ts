import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { paymentService, studentService } from '@/services';
import type { TeacherPayment } from './types';

export function useTeacherPayments() {
  return useQuery({
    queryKey: ['teacher', 'payments'],
    queryFn: () => paymentService.list(),
  });
}

export function useTeacherInstallments() {
  return useQuery({
    queryKey: ['teacher', 'installments'],
    queryFn: () => paymentService.listAllInstallments(),
  });
}

/** Approving a payment doesn't automatically enroll the student server-side
 *  (the backend only flips the payment's status) — so once approved, this
 *  also grants access by calling the real enroll endpoint for the payment's
 *  course. If the payment has no course reference, enrollment is skipped
 *  and the approval still succeeds (nothing to enroll into). */
export function useApprovePayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payment: TeacherPayment) => {
      await paymentService.approve(payment.id);
      if (payment.courseId) {
        // Best-effort — a student already enrolled (re-approving, or a free
        // preview) shouldn't turn a successful approval into an error toast.
        await studentService.enroll(payment.studentId, payment.courseId).catch(() => {});
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['teacher', 'payments'] }),
  });
}

export function useRejectPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (paymentId: number) => paymentService.reject(paymentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['teacher', 'payments'] }),
  });
}
