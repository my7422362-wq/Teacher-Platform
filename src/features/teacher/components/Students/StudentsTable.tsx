import { useMemo, useState } from 'react';
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
  Input,
  Select,
  Avatar,
  Badge,
  EmptyState,
  type SelectOption,
} from '@/components/ui';
import { Search } from 'lucide-react';
import { getTeacherStudents } from './data';

type StatusFilter = 'all' | 'active' | 'inactive' | 'suspended';

const STATUS_VARIANT: Record<Exclude<StatusFilter, 'all'>, 'success' | 'outline' | 'destructive'> = {
  active: 'success',
  inactive: 'outline',
  suspended: 'destructive',
};

export function StudentsTable() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');

  const students = getTeacherStudents();

  const statusOptions: SelectOption[] = useMemo(
    () => [
      { value: 'all', label: t('teacherPages.students.statusAll') },
      { value: 'active', label: t('teacherPages.students.statusActive') },
      { value: 'inactive', label: t('teacherPages.students.statusInactive') },
      { value: 'suspended', label: t('teacherPages.students.statusSuspended') },
    ],
    [t]
  );

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.trim().toLowerCase()) ||
      s.email.toLowerCase().includes(search.trim().toLowerCase());
    const matchesStatus = status === 'all' || s.status === status;
    return matchesSearch && matchesStatus;
  });

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <Input
            placeholder={t('teacherPages.students.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            endAdornment={<Search className="h-4 w-4 text-[rgba(249,246,240,0.45)]" />}
          />
        </div>
        <div className="sm:w-56">
          <Select
            placeholder={t('teacherPages.students.filterStatus')}
            options={statusOptions}
            value={status}
            onChange={(value) => setStatus(value as StatusFilter)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState description={t('teacherPages.students.empty')} />
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('teacherPages.students.tableName')}</TableHead>
                  <TableHead>{t('teacherPages.students.tableEmail')}</TableHead>
                  <TableHead>{t('teacherPages.students.tableCourses')}</TableHead>
                  <TableHead>{t('teacherPages.students.tableGroups')}</TableHead>
                  <TableHead>{t('teacherPages.students.tableStatus')}</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar src={student.avatar} alt={student.name} size="sm" />
                        <span className="font-medium text-[#F9F6F0]">{student.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>
                      {student.completedCourses} / {student.enrolledCourses}
                    </TableCell>
                    <TableCell>{student.groupNames.join('، ') || '—'}</TableCell>
                    <TableCell>
                      <Badge variant={STATUS_VARIANT[student.status]}>
                        {t(`teacherPages.students.status${student.status[0].toUpperCase()}${student.status.slice(1)}`)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Link to={`/teacher/students/${student.id}`} className="text-sm text-[#D4B59E] hover:underline">
                        {t('teacherPages.students.viewProfile')}
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
