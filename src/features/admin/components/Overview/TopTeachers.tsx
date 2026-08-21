import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, Avatar, Badge, EmptyState, Spinner } from '@/components/ui';
import { Trophy } from 'lucide-react';
import { useAdminTeachers } from '@/features/admin/components/Teachers/queries';

export function TopTeachers() {
  const { t } = useTranslation();
  const { data: teachers = [], isLoading } = useAdminTeachers();

  const top = [...teachers].sort((a, b) => b.studentsCount - a.studentsCount).slice(0, 5);

  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-base font-semibold text-[#F9F6F0]">
            <Trophy className="h-4 w-4 text-[#D4B59E]" />
            {t('adminPages.overview.topTeachers.title')}
          </h2>
          <Link to="/admin/teachers" className="text-sm text-[#D4B59E] hover:underline">
            {t('common.viewAll')}
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-6">
            <Spinner size="sm" />
          </div>
        ) : top.length === 0 ? (
          <EmptyState description={t('adminPages.teachers.empty')} />
        ) : (
          <div className="divide-y divide-[rgba(212,181,158,0.12)]">
            {top.map((teacher, index) => (
              <div key={teacher.id} className="flex items-center gap-3 py-3">
                <span className="w-5 shrink-0 text-center text-sm font-semibold text-[rgba(249,246,240,0.45)]">
                  {index + 1}
                </span>
                <Avatar size="sm" src={teacher.avatar ?? undefined} fallback={teacher.name} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#F9F6F0]">{teacher.name}</p>
                  <p className="truncate text-xs text-[rgba(249,246,240,0.55)]">
                    {t('adminPages.teachers.table.courses')}: {teacher.coursesCount}
                  </p>
                </div>
                <Badge variant="outline" className="shrink-0">
                  {t('adminPages.overview.topTeachers.students', { count: teacher.studentsCount })}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
