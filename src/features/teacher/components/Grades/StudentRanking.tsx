import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Avatar,
  Badge,
  EmptyState,
} from '@/components/ui';
import { Trophy } from 'lucide-react';
import type { StudentRankingItem } from './types';

export function StudentRanking({ ranking }: { ranking: StudentRankingItem[] }) {
  const { t } = useTranslation();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">{t('teacherPages.grades.ranking.title')}</h2>

      {ranking.length === 0 ? (
        <EmptyState icon={<Trophy className="h-12 w-12" />} description={t('teacherPages.grades.ranking.empty')} />
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('teacherPages.grades.ranking.rank')}</TableHead>
                  <TableHead>{t('teacherPages.grades.ranking.student')}</TableHead>
                  <TableHead>{t('teacherPages.grades.ranking.average')}</TableHead>
                  <TableHead>{t('teacherPages.grades.ranking.graded')}</TableHead>
                  <TableHead>{t('teacherPages.grades.ranking.passed')}</TableHead>
                  <TableHead>{t('teacherPages.grades.ranking.failed')}</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {ranking.map((item) => (
                  <TableRow key={item.studentId}>
                    <TableCell>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D4B59E]/15 text-sm font-semibold text-[#D4B59E]">
                        {item.rank}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar src={item.avatar ?? undefined} alt={item.name} size="sm" />
                        <span className="font-medium text-[#F9F6F0]">{item.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-[#D4B59E]">{item.averagePercent}%</span>
                    </TableCell>
                    <TableCell>{item.gradedCount}</TableCell>
                    <TableCell>
                      <Badge variant="success">{item.passedCount}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="destructive">{item.failedCount}</Badge>
                    </TableCell>
                    <TableCell>
                      <Link to={`/teacher/students/${item.studentId}`} className="text-sm text-[#D4B59E] hover:underline">
                        {t('teacherPages.grades.ranking.viewProfile')}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
