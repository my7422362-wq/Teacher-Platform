/**
 * Real backend Group shape. The backend now also stores a weekly session
 * schedule per group (day + start/end time), returned/accepted as a
 * `schedule` array alongside name/description/students.
 */

export type ScheduleDay = 'saturday' | 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

export interface GroupScheduleSlot {
  day: ScheduleDay;
  startTime: string;
  endTime: string;
}

export interface GroupStudent {
  id: number;
  name: string;
  avatar: string | null;
}

export interface TeacherGroup {
  id: number;
  name: string;
  description: string | null;
  students: GroupStudent[];
  schedule: GroupScheduleSlot[];
  createdAt: string | null;
}

export interface TeacherGroupFormValues {
  name: string;
  description: string;
  studentIds: number[];
  schedule: GroupScheduleSlot[];
}
