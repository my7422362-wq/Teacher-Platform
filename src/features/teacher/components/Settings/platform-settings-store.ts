const PLATFORM_SETTINGS_KEY = 'lms_platform_settings';

export interface PlatformSettings {
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
}

const DEFAULT_SETTINGS: PlatformSettings = {
  name: 'منصة التعلم',
  description: 'منصة تعليمية متخصصة في تدريس اللغة العربية، نقدم شرحًا مبسطًا ومنظمًا وتدريبات تفاعلية.',
  contactEmail: 'contact@example.com',
  contactPhone: '01000000000',
};

export function getPlatformSettings(): PlatformSettings {
  try {
    const raw = localStorage.getItem(PLATFORM_SETTINGS_KEY);
    if (raw) return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<PlatformSettings>) };
  } catch {
    // fall through to defaults
  }
  return DEFAULT_SETTINGS;
}

export function savePlatformSettings(settings: PlatformSettings): void {
  localStorage.setItem(PLATFORM_SETTINGS_KEY, JSON.stringify(settings));
}
