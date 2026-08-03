import type { CommunicationLogEntry } from '@/types';

const LOG_KEY = 'lms_local_communication_log';

function read(): CommunicationLogEntry[] {
  try {
    const raw = localStorage.getItem(LOG_KEY);
    return raw ? (JSON.parse(raw) as CommunicationLogEntry[]) : [];
  } catch {
    return [];
  }
}

function write(entries: CommunicationLogEntry[]): void {
  localStorage.setItem(LOG_KEY, JSON.stringify(entries));
}

export function getLocalCommunicationLog(): CommunicationLogEntry[] {
  return read();
}

export function saveCommunicationLogEntry(entry: CommunicationLogEntry): void {
  write([...read(), entry]);
}
