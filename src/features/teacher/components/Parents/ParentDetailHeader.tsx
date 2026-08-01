import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, Avatar, Badge } from '@/components/ui';
import { ArrowRight } from 'lucide-react';
import type { ParentListItem } from './data';

export function ParentDetailHeader({
  parent,
  studentAvatar,
}: {
  parent: ParentListItem;
  studentAvatar?: string;
}) {
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
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#F9F6F0]">{parent.name}</h2>
              <Badge variant="outline">
                {t(`teacherPages.parents.relationship${parent.relationship[0].toUpperCase()}${parent.relationship.slice(1)}`)}
              </Badge>
            </div>
            <div>
              <p className="text-xs text-[rgba(249,246,240,0.45)]">
                {t('teacherPages.parentDetail.contactTitle')}
              </p>
              <p className="text-sm text-[rgba(249,246,240,0.85)]">{parent.email}</p>
              <p className="text-sm text-[rgba(249,246,240,0.85)]">{parent.phone}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="mb-3 text-xs text-[rgba(249,246,240,0.45)]">
              {t('teacherPages.parentDetail.linkedStudentTitle')}
            </p>
            <Link
              to={`/teacher/students/${parent.studentId}`}
              className="flex items-center gap-3 rounded-lg p-2 -m-2 transition-colors hover:bg-[#16342D]"
            >
              <Avatar src={studentAvatar} alt={parent.studentName} size="md" />
              <span className="font-medium text-[#F9F6F0]">{parent.studentName}</span>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
