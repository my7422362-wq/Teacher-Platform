import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { meetingService, type MeetingFormValues, type Meeting } from '@/services';
import { useTeacherCourses } from '@/features/teacher/components/Courses/queries';

export interface TeacherMeetingItem {
  meeting: Meeting;
  courseTitle: string;
}

/** No global "list all meetings" endpoint — meetings are scoped per
 *  course (like quizzes/exams), so this aggregates across the teacher's
 *  real course list, one request per course. A course the teacher no
 *  longer owns (e.g. after a backend reseed reassigns it) will 403 on
 *  its own meetings request — that's treated as "no meetings for this
 *  course" rather than failing the whole page, so the other courses'
 *  meetings still show up. */
export function useTeacherMeetings() {
  const { data: courses = [], isLoading: coursesLoading, isError: coursesError, refetch: refetchCourses } = useTeacherCourses();

  const meetingQueries = useQueries({
    queries: courses.map((course) => ({
      queryKey: ['teacher', 'meetings-by-course', course.slug],
      queryFn: () => meetingService.listByCourse(course.slug).catch(() => []),
    })),
  });

  const isLoading = coursesLoading || meetingQueries.some((q) => q.isLoading);
  const isError = coursesError;

  const data = courses
    .flatMap((course, index) => (meetingQueries[index]?.data ?? []).map((meeting) => ({ meeting, courseTitle: course.title })))
    .sort((a, b) => new Date(b.meeting.scheduledAt).getTime() - new Date(a.meeting.scheduledAt).getTime());

  function refetch() {
    refetchCourses();
    meetingQueries.forEach((q) => q.refetch());
  }

  return { data, isLoading, isError, refetch };
}

export function useCreateMeeting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courseSlug, values }: { courseSlug: string; values: MeetingFormValues }) =>
      meetingService.create(courseSlug, values),
    onSuccess: (_data, { courseSlug }) =>
      queryClient.invalidateQueries({ queryKey: ['teacher', 'meetings-by-course', courseSlug] }),
  });
}

export function useDeleteMeeting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ meetingId }: { meetingId: number; courseSlug: string }) => meetingService.remove(meetingId),
    onSuccess: (_data, { courseSlug }) =>
      queryClient.invalidateQueries({ queryKey: ['teacher', 'meetings-by-course', courseSlug] }),
  });
}
