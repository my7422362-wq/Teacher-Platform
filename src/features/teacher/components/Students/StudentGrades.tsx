import { useTranslation } from 'react-i18next';
import { Card, CardContent, Badge, EmptyState } from '@/components/ui';
import { ClipboardCheck } from 'lucide-react';
import type { StudentGradeItem } from './data';

const KIND_KEY = {
  assignment: 'teacherPages.studentDetail.kindAssignment',
  quiz: 'teacherPages.studentDetail.kindQuiz',
  exam: 'teacherPages.studentDetail.kindExam',
} as const;

export function StudentGrades({ grades }: { grades: StudentGradeItem[] }) {
  const { t } = useTranslation();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">
        {t('teacherPages.studentDetail.gradesTitle')}
      </h2>

      {grades.length === 0 ? (
        <EmptyState
          icon={<ClipboardCheck className="h-12 w-12" />}
          description={t('teacherPages.studentDetail.gradesEmpty')}
        />
      ) : (
        <Card>
          <CardContent className="divide-y divide-[rgba(212,181,158,0.12)] p-0">
            {grades.map((grade) => {
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
                      {t('teacherPages.studentDetail.score', { score: grade.score, max: grade.maxScore })}
                    </span>
                    <Badge variant={passed ? 'success' : 'destructive'}>
                      {passed ? t('teacherPages.quizzesExams.results.passed') : t('teacherPages.quizzesExams.results.failed')}
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
