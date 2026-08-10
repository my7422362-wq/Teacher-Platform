import { useQuery } from '@tanstack/react-query';
import { groupService, attendanceService } from '@/services';
import type { AttendanceTrendPoint } from './types';

export const attendanceTrendKey = ['teacher', 'dashboard', 'attendance-trend'] as const;

/** No analytics endpoint is relied on here — this reuses the already-wired
 *  Groups + Attendance services and buckets the last 14 days client-side. */
export function useAttendanceTrend() {
  return useQuery({
    queryKey: attendanceTrendKey,
    queryFn: async (): Promise<AttendanceTrendPoint[]> => {
      const groups = await groupService.list();
      const recordsByGroup = await Promise.all(
        groups.map((g) => attendanceService.listForGroup(g.id).catch(() => []))
      );

      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 13);
      cutoff.setHours(0, 0, 0, 0);

      const byDate = new Map<string, { total: number; present: number }>();
      for (const records of recordsByGroup) {
        for (const record of records) {
          const key = record.date.slice(0, 10);
          if (new Date(key) < cutoff) continue;
          const bucket = byDate.get(key) ?? { total: 0, present: 0 };
          bucket.total += 1;
          if (record.status !== 'absent') bucket.present += 1;
          byDate.set(key, bucket);
        }
      }

      return Array.from(byDate.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, { total, present }]) => ({
          date,
          presentRate: total ? Math.round((present / total) * 100) : 0,
        }));
    },
  });
}
