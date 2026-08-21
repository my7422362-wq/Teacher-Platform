import { useQuery } from '@tanstack/react-query';
import { adminService } from '@/services';

export function useAdminStudents() {
  return useQuery({
    queryKey: ['admin', 'students'],
    queryFn: () => adminService.listStudents(),
  });
}
