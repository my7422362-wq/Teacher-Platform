import { mockGroups } from '@/mock';
import type { Group, GroupScheduleSlot } from '@/types';

const GROUPS_KEY = 'lms_groups_state';

function read(): Group[] {
  try {
    const raw = localStorage.getItem(GROUPS_KEY);
    if (raw) return JSON.parse(raw) as Group[];
  } catch {
    // fall through to seed
  }
  const seeded = [...mockGroups];
  write(seeded);
  return seeded;
}

function write(groups: Group[]): void {
  localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
}

export function getGroups(): Group[] {
  return read();
}

export function getGroup(id: number): Group | undefined {
  return read().find((g) => g.id === id);
}

export interface GroupFormValues {
  name: string;
  courseId: number;
  studentIds: number[];
  schedule: GroupScheduleSlot[];
}

export function createGroup(values: GroupFormValues, teacherId: number): Group {
  const groups = read();
  const id = groups.length ? Math.max(...groups.map((g) => g.id)) + 1 : 1;

  const group: Group = {
    id,
    teacherId,
    ...values,
    createdAt: new Date().toISOString(),
  };

  write([...groups, group]);
  return group;
}

export function updateGroup(id: number, values: GroupFormValues): Group | null {
  const groups = read();
  const index = groups.findIndex((g) => g.id === id);
  if (index === -1) return null;

  const updated: Group = { ...groups[index], ...values };
  groups[index] = updated;
  write(groups);
  return updated;
}

export function deleteGroup(id: number): void {
  write(read().filter((g) => g.id !== id));
}
