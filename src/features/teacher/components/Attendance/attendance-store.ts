import { mockAttendance } from '@/mock';
import type { AttendanceRecord } from '@/types';

const ATTENDANCE_KEY = 'lms_attendance_state';

function read(): AttendanceRecord[] {
  try {
    const raw = localStorage.getItem(ATTENDANCE_KEY);
    if (raw) return JSON.parse(raw) as AttendanceRecord[];
  } catch {
    // fall through to seed
  }
  const seeded = [...mockAttendance];
  write(seeded);
  return seeded;
}

function write(records: AttendanceRecord[]): void {
  localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(records));
}

function dateKey(iso: string): string {
  return iso.slice(0, 10);
}

export function getAttendanceRecords(): AttendanceRecord[] {
  return read();
}

export function getRecordsForGroupAndDate(groupId: number, dateISO: string): AttendanceRecord[] {
  const key = dateKey(dateISO);
  return read().filter((r) => r.groupId === groupId && dateKey(r.date) === key);
}

export function setAttendance(
  groupId: number,
  studentId: number,
  dateISO: string,
  status: AttendanceRecord['status']
): void {
  const records = read();
  const key = dateKey(dateISO);
  const existing = records.find(
    (r) => r.groupId === groupId && r.studentId === studentId && dateKey(r.date) === key
  );

  if (existing) {
    existing.status = status;
  } else {
    const nextId = records.reduce((max, r) => Math.max(max, r.id), 0) + 1;
    records.push({ id: nextId, groupId, studentId, date: dateISO, status });
  }

  write(records);
}
