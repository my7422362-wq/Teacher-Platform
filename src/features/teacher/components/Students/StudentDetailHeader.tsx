import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, Avatar, Badge } from '@/components/ui';
import { ArrowRight } from 'lucide-react';
import type { TeacherStudent } from './types';

const STATUS_VARIANT = {
  active: 'success',
  inactive: 'outline',
  suspended: 'destructive',
  pending: 'outline',
} as const;

export function StudentDetailHeader({ student }: { student: TeacherStudent }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <Link
        to="/teacher/students"
        className="inline-flex items-center gap-1.5 text-sm text-[#D4B59E] hover:underline"
      >
        <ArrowRight className="h-4 w-4" />
        {t('teacherPages.studentDetail.backToStudents')}
      </Link>

      <Card>
        <CardContent className="flex flex-wrap items-center gap-4 p-6">
          <Avatar src={student.avatar ?? undefined} alt={student.name} size="xl" />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[#F9F6F0]">{student.name}</h2>
            <p className="text-sm text-[rgba(249,246,240,0.65)]">{student.email}</p>
            {student.phone && <p className="text-sm text-[rgba(249,246,240,0.65)]">{student.phone}</p>}
          </div>
          <div className="space-y-1 text-end">
            <p className="text-xs text-[rgba(249,246,240,0.45)]">
              {t('teacherPages.studentDetail.subscriptionTitle')}
            </p>
            <Badge variant={STATUS_VARIANT[student.status]}>
              {t(`teacherPages.students.status${student.status[0].toUpperCase()}${student.status.slice(1)}`)}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
