import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui';
import { getEnrollmentTrend } from './data';

const WIDTH = 600;
const HEIGHT = 200;
const PAD_LEFT = 32;
const PAD_RIGHT = 12;
const PAD_TOP = 24;
const PAD_BOTTOM = 24;
const BAR_MAX_WIDTH = 24;

const ACCENT = '#D4B59E';

function formatMonth(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale, { month: 'short' });
}

export function EnrollmentChart() {
  const { t, i18n } = useTranslation();
  const points = getEnrollmentTrend();
  const [hovered, setHovered] = useState<number | null>(null);

  const plotWidth = WIDTH - PAD_LEFT - PAD_RIGHT;
  const plotHeight = HEIGHT - PAD_TOP - PAD_BOTTOM;

  const maxValue = Math.max(...points.map((p) => p.count), 1);
  const niceMax = Math.ceil(maxValue / 10) * 10 || 10;
  const yTicks = [0, niceMax / 2, niceMax];

  const slotWidth = plotWidth / points.length;
  const barWidth = Math.min(BAR_MAX_WIDTH, slotWidth * 0.5);

  const y = (value: number) => PAD_TOP + plotHeight - (value / niceMax) * plotHeight;
  const slotCenter = (i: number) => PAD_LEFT + slotWidth * (i + 0.5);

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-4 text-sm font-semibold text-[#F9F6F0]">
          {t('teacherPages.dashboard.charts.enrollmentTitle')}
        </h3>

        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" role="img" aria-label={t('teacherPages.dashboard.charts.enrollmentTitle')}>
          {yTicks.map((tick) => (
            <g key={tick}>
              <line
                x1={PAD_LEFT}
                x2={WIDTH - PAD_RIGHT}
                y1={y(tick)}
                y2={y(tick)}
                stroke="rgba(249,246,240,0.08)"
                strokeWidth={1}
              />
              <text x={PAD_LEFT - 8} y={y(tick)} textAnchor="end" dominantBaseline="middle" className="fill-[rgba(249,246,240,0.45)] text-[9px]">
                {tick}
              </text>
            </g>
          ))}

          {points.map((p, i) => {
            const barHeight = (p.count / niceMax) * plotHeight;
            const cx = slotCenter(i);
            const isHovered = hovered === i;

            return (
              <g key={p.month}>
                <rect
                  x={cx - barWidth / 2}
                  y={y(p.count)}
                  width={barWidth}
                  height={barHeight}
                  rx={4}
                  fill={ACCENT}
                  opacity={isHovered ? 1 : 0.85}
                  tabIndex={0}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  className="cursor-pointer outline-none"
                />
                <text x={cx} y={y(p.count) - 6} textAnchor="middle" className="fill-[rgba(249,246,240,0.75)] text-[9px] font-medium">
                  {p.count}
                </text>
                <text x={cx} y={HEIGHT - 6} textAnchor="middle" className="fill-[rgba(249,246,240,0.45)] text-[9px]">
                  {formatMonth(p.month, i18n.language)}
                </text>
              </g>
            );
          })}

          {hovered !== null && (
            <g>
              <rect
                x={Math.min(Math.max(slotCenter(hovered) - 44, 0), WIDTH - 88)}
                y={Math.max(y(points[hovered].count) - 34, 0)}
                width={88}
                height={26}
                rx={6}
                fill="#0F2520"
                stroke="rgba(212,181,158,0.3)"
              />
              <text
                x={Math.min(Math.max(slotCenter(hovered), 44), WIDTH - 44)}
                y={Math.max(y(points[hovered].count) - 21, 13)}
                textAnchor="middle"
                className="fill-[#F9F6F0] text-[10px] font-semibold"
              >
                {t('teacherPages.dashboard.charts.enrollmentTooltip', { count: points[hovered].count })}
              </text>
              <text
                x={Math.min(Math.max(slotCenter(hovered), 44), WIDTH - 44)}
                y={Math.max(y(points[hovered].count) - 11, 23)}
                textAnchor="middle"
                className="fill-[rgba(249,246,240,0.55)] text-[8px]"
              >
                {formatMonth(points[hovered].month, i18n.language)}
              </text>
            </g>
          )}
        </svg>
      </CardContent>
    </Card>
  );
}
