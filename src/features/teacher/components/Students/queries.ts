import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studentService } from '@/services';

export const studentsKey = ['teacher', 'students'] as const;
export const studentKey = (id: number) => ['teacher', 'student', id] as const;
export const studentCoursesKey = (id: number) => ['teacher', 'student-courses', id] as const;
export const studentAttendanceKey = (id: number) => ['teacher', 'student-attendance', id] as const;
export const studentNotesKey = (id: number) => ['teacher', 'student-notes', id] as const;

export function useTeacherStudentsList() {
  return useQuery({ queryKey: studentsKey, queryFn: studentService.list });
}

export function useTeacherStudent(studentId: number) {
  return useQuery({ queryKey: studentKey(studentId), queryFn: () => studentService.getById(studentId), enabled: !!studentId });
}

export function useStudentCourses(studentId: number) {
  return useQuery({
    queryKey: studentCoursesKey(studentId),
    queryFn: () => studentService.getCoursesWithProgress(studentId),
    enabled: !!studentId,
  });
}

export function useStudentAttendance(studentId: number) {
  return useQuery({
    queryKey: studentAttendanceKey(studentId),
    queryFn: () => studentService.getAttendance(studentId),
    enabled: !!studentId,
  });
}

export function useStudentNotes(studentId: number) {
  return useQuery({
    queryKey: studentNotesKey(studentId),
    queryFn: () => studentService.listNotes(studentId),
    enabled: !!studentId,
  });
}

export function useAddStudentNote(studentId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (note: string) => studentService.addNote(studentId, note),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: studentNotesKey(studentId) }),
  });
}

export function useDeleteStudentNote(studentId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (noteId: number) => studentService.removeNote(noteId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: studentNotesKey(studentId) }),
  });
}
