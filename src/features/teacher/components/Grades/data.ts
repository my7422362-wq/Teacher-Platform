import { getTeacherStudents, getStudentDetail } from '@/features/teacher/components/Students/data';

export interface StudentRankingItem {
  rank: number;
  studentId: number;
  name: string;
  avatar: string;
  averagePercent: number;
  gradedCount: number;
  passedCount: number;
  failedCount: number;
}

export interface GradesOverview {
  overallAverage: number;
  totalGraded: number;
  totalPassed: number;
  totalFailed: number;
  passRate: number;
  failRate: number;
  ranking: StudentRankingItem[];
}

export function getGradesOverview(): GradesOverview {
  const students = getTeacherStudents();

  const rankingRaw = students.map((student) => {
    const grades = getStudentDetail(student.id)?.grades ?? [];
    const percentages = grades.map((g) => (g.maxScore ? (g.score / g.maxScore) * 100 : 0));
    const averagePercent = percentages.length
      ? Math.round(percentages.reduce((sum, p) => sum + p, 0) / percentages.length)
      : 0;
    const passedCount = grades.filter((g) => g.score >= g.passingScore).length;

    return {
      studentId: student.id,
      name: student.name,
      avatar: student.avatar,
      averagePercent,
      gradedCount: grades.length,
      passedCount,
      failedCount: grades.length - passedCount,
    };
  });

  const ranking: StudentRankingItem[] = rankingRaw
    .filter((r) => r.gradedCount > 0)
    .sort((a, b) => b.averagePercent - a.averagePercent)
    .map((r, index) => ({ ...r, rank: index + 1 }));

  const totalGraded = ranking.reduce((sum, r) => sum + r.gradedCount, 0);
  const totalPassed = ranking.reduce((sum, r) => sum + r.passedCount, 0);
  const totalFailed = ranking.reduce((sum, r) => sum + r.failedCount, 0);
  const overallAverage = ranking.length
    ? Math.round(ranking.reduce((sum, r) => sum + r.averagePercent, 0) / ranking.length)
    : 0;

  return {
    overallAverage,
    totalGraded,
    totalPassed,
    totalFailed,
    passRate: totalGraded ? Math.round((totalPassed / totalGraded) * 100) : 0,
    failRate: totalGraded ? Math.round((totalFailed / totalGraded) * 100) : 0,
    ranking,
  };
}
