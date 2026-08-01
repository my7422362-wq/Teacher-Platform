import { useState } from 'react';
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
  Badge,
  EmptyState,
} from '@/components/ui';
import { Search } from 'lucide-react';
import { getTeacherParents } from './data';

export function ParentsTable() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  const parents = getTeacherParents();
  const filtered = parents.filter((p) => {
    const q = search.trim().toLowerCase();
    return p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q);
  });

  return (
    <section className="space-y-4">
      <Input
        placeholder={t('teacherPages.parents.searchPlaceholder')}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        endAdornment={<Search className="h-4 w-4 text-[rgba(249,246,240,0.45)]" />}
      />

      {filtered.length === 0 ? (
        <EmptyState description={t('teacherPages.parents.empty')} />
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('teacherPages.parents.tableName')}</TableHead>
                  <TableHead>{t('teacherPages.parents.tableRelationship')}</TableHead>
                  <TableHead>{t('teacherPages.parents.tableStudent')}</TableHead>
                  <TableHead>{t('teacherPages.parents.tableContact')}</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((parent) => (
                  <TableRow key={parent.id}>
                    <TableCell>
                      <span className="font-medium text-[#F9F6F0]">{parent.name}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {t(`teacherPages.parents.relationship${parent.relationship[0].toUpperCase()}${parent.relationship.slice(1)}`)}
                      </Badge>
                    </TableCell>
                    <TableCell>{parent.studentName}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="text-[rgba(249,246,240,0.85)]">{parent.email}</p>
                        <p className="text-[rgba(249,246,240,0.55)]">{parent.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link to={`/teacher/parents/${parent.id}`} className="text-sm text-[#D4B59E] hover:underline">
                        {t('teacherPages.parents.viewProfile')}
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
