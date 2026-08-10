/**
 * Real backend Parent shape. NOTE: parents are real USER accounts (need a
 * password on creation) linked to MULTIPLE students — not the single-child
 * "contact card" the old mock modeled. There's also no `relationship`
 * field (father/mother/guardian) in the real ParentResource.
 */

export interface ParentLinkedStudent {
  id: number;
  name: string;
  avatar: string | null;
}

export interface TeacherParent {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  status: string;
  students: ParentLinkedStudent[];
  createdAt: string | null;
}

export interface TeacherParentFormValues {
  name: string;
  email: string;
  phone: string;
  password?: string;
  studentIds: number[];
}

/** Real backend enum — differs from the old mock's call/whatsapp/email/meeting. */
export type CommunicationChannel = 'sms' | 'email' | 'call' | 'in_person';

export interface CommunicationLogItem {
  id: number;
  parentId: number;
  teacherId: number;
  message: string;
  type: CommunicationChannel;
  loggedAt: string;
}
