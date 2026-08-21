import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { paymentService, studentService } from '@/services';
import type { TeacherPayment } from '@/features/teacher/components/Payments/types';

const ADMIN_PAYMENTS_KEY = ['admin', 'payments'];

/** GET /payments is scoped server-side by role — an admin calling it sees
 *  every payment platform-wide, so the same real service the teacher
 *  dashboard uses works here unchanged. */
export function useAdminPayments() {
  return useQuery({
    queryKey: ADMIN_PAYMENTS_KEY,
    queryFn: () => paymentService.list(),
  });
}

export function useAdminApprovePayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payment: TeacherPayment) => {
      await paymentService.approve(payment.id);
      if (payment.courseId) {
        await studentService.enroll(payment.studentId, payment.courseId).catch(() => {});
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ADMIN_PAYMENTS_KEY }),
  });
}

export function useAdminRejectPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (paymentId: number) => paymentService.reject(paymentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ADMIN_PAYMENTS_KEY }),
  });
}
