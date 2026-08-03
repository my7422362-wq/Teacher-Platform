import { useTranslation } from 'react-i18next';
import { ABOUT_TEACHER_DATA } from './about.data';
import { AchievementCard } from './AchievementCard';

export function AchievementGrid() {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-4">
      {ABOUT_TEACHER_DATA.achievements.map((achievement, index) => (
        <AchievementCard
          key={achievement.icon}
          value={t(achievement.valueKey)}
          label={t(achievement.labelKey)}
          iconName={achievement.icon}
          delay={0.2 + index * 0.1}
        />
      ))}
    </div>
  );
}

