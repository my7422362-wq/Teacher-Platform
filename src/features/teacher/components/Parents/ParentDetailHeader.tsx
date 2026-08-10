import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, Avatar } from '@/components/ui';
import { ArrowRight } from 'lucide-react';
import type { TeacherParent } from './types';

export function ParentDetailHeader({ parent }: { parent: TeacherParent }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <Link
        to="/teacher/parents"
        className="inline-flex items-center gap-1.5 text-sm text-[#D4B59E] hover:underline"
      >
        <ArrowRight className="h-4 w-4" />
        {t('teacherPages.parentDetail.backToParents')}
      </Link>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="space-y-3 p-6">
            <h2 className="text-lg font-bold text-[#F9F6F0]">{parent.name}</h2>
            <div>
              <p className="text-xs text-[rgba(249,246,240,0.45)]">
                {t('teacherPages.parentDetail.contactTitle')}
              </p>
              <p className="text-sm text-[rgba(249,246,240,0.85)]">{parent.email}</p>
              {parent.phone && <p className="text-sm text-[rgba(249,246,240,0.85)]">{parent.phone}</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="mb-3 text-xs text-[rgba(249,246,240,0.45)]">
              {t('teacherPages.parentDetail.linkedStudentTitle')}
            </p>
            {parent.students.length === 0 ? (
              <p className="text-sm text-[rgba(249,246,240,0.55)]">—</p>
            ) : (
              <div className="space-y-2">
                {parent.students.map((student) => (
                  <Link
                    key={student.id}
                    to={`/teacher/students/${student.id}`}
                    className="flex items-center gap-3 rounded-lg p-2 -m-2 transition-colors hover:bg-[#16342D]"
                  >
                    <Avatar src={student.avatar ?? undefined} alt={student.name} size="md" />
                    <span className="font-medium text-[#F9F6F0]">{student.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
