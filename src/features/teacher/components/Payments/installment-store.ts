import { mockInstallments } from '@/mock';
import type { Installment } from '@/types';

const INSTALLMENTS_KEY = 'lms_installments_state';

function read(): Installment[] {
  try {
    const raw = localStorage.getItem(INSTALLMENTS_KEY);
    if (raw) return JSON.parse(raw) as Installment[];
  } catch {
    // fall through to seed
  }
  const seeded = [...mockInstallments];
  write(seeded);
  return seeded;
}

function write(installments: Installment[]): void {
  localStorage.setItem(INSTALLMENTS_KEY, JSON.stringify(installments));
}

export function getInstallments(): Installment[] {
  return read();
}

export function markInstallmentPaid(id: number, paymentMethod: Installment['paymentMethod']): void {
  const installments = read();
  const installment = installments.find((i) => i.id === id);
  if (!installment) return;

  installment.status = 'paid';
  installment.paidAt = new Date().toISOString();
  installment.paymentMethod = paymentMethod;
  write(installments);
}
