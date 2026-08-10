import { useQuery } from '@tanstack/react-query';
import { teacherService } from '@/services';

export function useGradesOverview() {
  return useQuery({
    queryKey: ['teacher', 'grades'],
    queryFn: () => teacherService.getGrades(),
  });
}
