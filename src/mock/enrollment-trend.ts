export interface MonthlyEnrollment {
  month: string;
  count: number;
}

/**
 * New-enrollment counts for the last 6 months, newest last.
 * Hand-authored demo trend (mock analytics, no backend yet).
 */
function buildEnrollmentTrend(): MonthlyEnrollment[] {
  const counts = [14, 19, 17, 23, 28, 25];
  const now = new Date();

  return counts.map((count, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (counts.length - 1 - index), 1);
    return { month: date.toISOString(), count };
  });
}

export const mockEnrollmentTrend: MonthlyEnrollment[] = buildEnrollmentTrend();
