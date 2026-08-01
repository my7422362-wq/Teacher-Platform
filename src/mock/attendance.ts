import type { AttendanceRecord } from '@/types';
import { mockGroups } from './groups';

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function daysAgoISODate(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(0, 0, 0, 0);
  return date.toISOString();
}

function buildAttendance(): AttendanceRecord[] {
  const records: AttendanceRecord[] = [];
  let nextId = 1;

  for (let daysAgo = 13; daysAgo >= 0; daysAgo--) {
    const date = daysAgoISODate(daysAgo);
    for (const group of mockGroups) {
      for (const studentId of group.studentIds) {
        const roll = pseudoRandom(daysAgo * 100 + studentId * 7 + group.id);
        const status = roll > 0.88 ? 'absent' : roll > 0.78 ? 'late' : 'present';
        records.push({ id: nextId++, groupId: group.id, studentId, date, status });
      }
    }
  }

  return records;
}

export const mockAttendance: AttendanceRecord[] = buildAttendance();
