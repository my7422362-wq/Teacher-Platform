export interface StudentRankingItem {
  rank: number;
  studentId: number;
  name: string;
  avatar: string | null;
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
