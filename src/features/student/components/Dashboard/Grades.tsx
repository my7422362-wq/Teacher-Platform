import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, Badge, EmptyState } from '@/components/ui';
import { ClipboardCheck } from 'lucide-react';
import { getGrades } from './data';

const KIND_KEY = {
  assignment: 'studentPages.dashboard.grades.kindAssignment',
  quiz: 'studentPages.dashboard.grades.kindQuiz',
  exam: 'studentPages.dashboard.grades.kindExam',
} as const;

interface GradesProps {
  limit?: number;
  viewAllHref?: string;
}

export function Grades({ limit, viewAllHref }: GradesProps) {
  const { t } = useTranslation();
  const grades = getGrades();
  const visible = limit ? grades.slice(0, limit) : grades;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#F9F6F0]">
          {t('studentPages.dashboard.grades.title')}
        </h2>
        {viewAllHref && (
          <Link to={viewAllHref} className="text-sm text-[#D4B59E] hover:underline">
            {t('common.viewAll')}
          </Link>
        )}
      </div>

      {visible.length === 0 ? (
        <EmptyState
          icon={<ClipboardCheck className="h-12 w-12" />}
          description={t('studentPages.dashboard.grades.empty')}
        />
      ) : (
        <Card>
          <CardContent className="divide-y divide-[rgba(212,181,158,0.12)] p-0">
            {visible.map((grade) => {
              const passed = grade.score >= grade.passingScore;
              return (
                <div key={grade.id} className="flex items-center gap-4 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-[#F9F6F0]">{grade.title}</p>
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm text-[rgba(249,246,240,0.55)]">{grade.courseName}</p>
                      <Badge variant="outline" className="shrink-0">
                        {t(KIND_KEY[grade.kind])}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="text-sm font-semibold text-[#D4B59E]">
                      {t('studentPages.dashboard.grades.score', {
                        score: grade.score,
                        max: grade.maxScore,
                      })}
                    </span>
                    <Badge variant={passed ? 'success' : 'destructive'}>
                      {passed
                        ? t('studentPages.dashboard.grades.passed')
                        : t('studentPages.dashboard.grades.failed')}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </section>
  );
}
