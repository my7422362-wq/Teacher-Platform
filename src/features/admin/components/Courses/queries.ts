import { useQuery } from '@tanstack/react-query';
import { adminService } from '@/services';

export function useAdminCourses() {
  return useQuery({
    queryKey: ['admin', 'courses'],
    queryFn: () => adminService.listCourses(),
  });
}
