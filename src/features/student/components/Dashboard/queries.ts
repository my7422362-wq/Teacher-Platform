import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studentService, publicCourseService, certificateService, paymentService, groupService } from '@/services';
import { useAuth } from '@/providers';

function useStudentId(): number {
  const { currentUser } = useAuth();
  return Number(currentUser?.id);
}

export function useMyCourses() {
  const studentId = useStudentId();
  return useQuery({
    queryKey: ['student', 'my-courses', studentId],
    queryFn: () => studentService.getCoursesWithProgress(studentId),
    enabled: !!studentId,
  });
}

export function useEnrollCourse() {
  const studentId = useStudentId();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId: number) => studentService.enroll(studentId, courseId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['student', 'my-courses', studentId] }),
  });
}

export function useRecommendedCourses() {
  return useQuery({
    queryKey: ['public-courses'],
    queryFn: () => publicCourseService.list(),
  });
}

export function useMyGroups() {
  const studentId = useStudentId();
  return useQuery({
    queryKey: ['student', 'groups', studentId],
    queryFn: () => groupService.listForStudent(studentId),
    enabled: !!studentId,
  });
}

export function useMyCertificates() {
  const studentId = useStudentId();
  return useQuery({
    queryKey: ['student', 'certificates', studentId],
    queryFn: () => certificateService.listForStudent(studentId),
    enabled: !!studentId,
  });
}

/** GET /payments is scoped server-side by role — a student calling it
 *  only ever sees their own payments, so the same real service the
 *  teacher dashboard uses works here unchanged. */
export function useMyPayments() {
  return useQuery({
    queryKey: ['student', 'payments'],
    queryFn: () => paymentService.list(),
  });
}

/** Submits a payment request for a course — enrollment is granted
 *  separately once a teacher approves it, not at submission time. */
export function useSubmitPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseId,
      amount,
      paymentMethod,
      senderPhone,
      receipt,
    }: {
      courseId: number;
      amount: number;
      paymentMethod: string;
      senderPhone: string;
      receipt: File;
    }) => paymentService.submit(courseId, amount, paymentMethod, senderPhone, receipt),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['student', 'payments'] }),
  });
}
