/**
 * Real backend Group shape. NOTE: the backend's GroupResource has no
 * course/schedule fields at all — groups are just named student cohorts
 * (name, description, students), not tied to a course or a weekly
 * timetable. The old mock model's `courseId`/`schedule` don't exist here.
 */

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
  createdAt: string | null;
}

export interface TeacherGroupFormValues {
  name: string;
  description: string;
  studentIds: number[];
}
