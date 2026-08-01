import type { StudentNote } from '@/types';

const NOTES_KEY = 'lms_local_student_notes';

function read(): StudentNote[] {
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    return raw ? (JSON.parse(raw) as StudentNote[]) : [];
  } catch {
    return [];
  }
}

function write(notes: StudentNote[]): void {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

export function getLocalStudentNotes(): StudentNote[] {
  return read();
}

export function saveStudentNote(note: StudentNote): void {
  write([...read(), note]);
}
