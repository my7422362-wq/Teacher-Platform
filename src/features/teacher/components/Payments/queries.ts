import { useQuery } from '@tanstack/react-query';
import { paymentService } from '@/services';

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
