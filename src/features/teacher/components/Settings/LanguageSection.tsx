import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui';
import { LanguageSwitcher } from '@/components/shared/language-switcher';

export function LanguageSection() {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('teacherPages.settings.languageTitle')}</CardTitle>
        <CardDescription>{t('teacherPages.settings.languageDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <LanguageSwitcher className="border border-[rgba(212,181,158,0.25)]" />
      </CardContent>
    </Card>
  );
}
