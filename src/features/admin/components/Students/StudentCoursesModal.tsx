import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Modal, Badge, EmptyState, Spinner, ErrorState } from '@/components/ui';
import { BookOpen, GraduationCap } from 'lucide-react';
import { studentService } from '@/services';
import type { AdminStudent } from '@/services';

interface StudentCoursesModalProps {
  student: AdminStudent | null;
  onClose: () => void;
}

export function StudentCoursesModal({ student, onClose }: StudentCoursesModalProps) {
  const { t } = useTranslation();
  const { data: courses = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['admin', 'student-courses', student?.id],
    queryFn: () => studentService.getCoursesWithProgress(student!.id),
    enabled: student !== null,
  });

  return (
    <Modal
      isOpen={student !== null}
      onClose={onClose}
      title={t('adminPages.students.coursesModal.title', { name: student?.name })}
      size="lg"
    >
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : isError ? (
        <ErrorState description={t('adminPages.students.coursesModal.loadFailed')} onRetry={() => refetch()} />
      ) : courses.length === 0 ? (
        <EmptyState icon={<BookOpen className="h-10 w-10" />} description={t('adminPages.students.coursesModal.empty')} />
      ) : (
        <div className="divide-y divide-[rgba(212,181,158,0.12)]">
          {courses.map((course) => (
            <div key={course.courseId} className="flex items-center gap-4 py-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#D4B59E]/15 text-[#D4B59E]">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-[#F9F6F0]">{course.courseTitle}</p>
                <div className="flex items-center gap-1.5 text-sm text-[rgba(249,246,240,0.55)]">
                  <GraduationCap className="h-3.5 w-3.5" />
                  {course.teacherName || t('adminPages.students.coursesModal.unknownTeacher')}
                </div>
              </div>
              <Badge variant="outline" className="shrink-0">
                {t('adminPages.students.coursesModal.progress', { percent: course.progressPercent })}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}
