/**
 * About Teacher section data
 *
 * Text fields hold i18n translation keys (see src/i18n/locales/*.json).
 */

export const ABOUT_TEACHER_DATA = {
  section: {
    badgeKey: 'about.section.badge',
    titleKey: 'about.section.title',
    descriptionKey: 'about.section.description',
  },
  mission: {
    titleKey: 'about.mission.title',
    paragraphKey: 'about.mission.paragraph',
  },
  titleKey: 'about.badgeSecondary',
  descriptionKey: 'about.description',
  teacherInfoKey: 'about.teacherInfo',
  features: [
    'about.features.feature1',
    'about.features.feature2',
    'about.features.feature3',
  ],
  achievements: [
    { valueKey: 'about.achievements.GraduationCap.value', labelKey: 'about.achievements.GraduationCap.label', icon: 'GraduationCap' },
    { valueKey: 'about.achievements.Users.value', labelKey: 'about.achievements.Users.label', icon: 'Users' },
    { valueKey: 'about.achievements.Star.value', labelKey: 'about.achievements.Star.label', icon: 'Star' },
    { valueKey: 'about.achievements.BookOpen.value', labelKey: 'about.achievements.BookOpen.label', icon: 'BookOpen' },
    { valueKey: 'about.achievements.Headphones.value', labelKey: 'about.achievements.Headphones.label', icon: 'Headphones' },
    { valueKey: 'about.achievements.RefreshCw.value', labelKey: 'about.achievements.RefreshCw.label', icon: 'RefreshCw' },
  ],
  timeline: [
    { year: '2014', labelKey: 'about.timeline.2014' },
    { year: '2017', labelKey: 'about.timeline.2017' },
    { year: '2021', labelKey: 'about.timeline.2021' },
    { year: '2026', labelKey: 'about.timeline.2026' },
  ],
} as const;
