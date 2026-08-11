import { useQuery } from '@tanstack/react-query';
import { publicCourseService } from '@/services';

export function usePublicCourses() {
  return useQuery({
    queryKey: ['public-courses'],
    queryFn: () => publicCourseService.list(),
  });
}

export function usePublicCourseDetail(slug: string) {
  return useQuery({
    queryKey: ['public-course-detail', slug],
    queryFn: () => publicCourseService.getBySlug(slug),
    enabled: !!slug,
  });
}
