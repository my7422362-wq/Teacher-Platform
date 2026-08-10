import axios from 'axios';
import api from '@/services/api';
import i18n from '@/i18n/config';

/** Real CertificateResource has no downloadable file URL and no grade
 *  field — only a verification code — so the UI shows the code instead
 *  of a "download" action that has no backend to call. */
export interface StudentCertificate {
  id: number;
  courseTitle: string;
  certificateCode: string;
  issuedAt: string;
}

interface CertificateResourceDto {
  id: number;
  course: { id: number; title: string };
  certificate_code: string;
  issued_at: string;
}

function extractErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    if (data?.message) return data.message;
  }
  return fallback;
}

export const certificateService = {
  async listForStudent(studentId: number): Promise<StudentCertificate[]> {
    try {
      const { data } = await api.get<{ data: CertificateResourceDto[] }>(`/students/${studentId}/certificates`);
      return data.data.map((c) => ({
        id: c.id,
        courseTitle: c.course.title,
        certificateCode: c.certificate_code,
        issuedAt: c.issued_at,
      }));
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('studentPages.dashboard.certificates.loadFailed')));
    }
  },
};
