import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui';
import { getAttendanceTrend } from './data';

const WIDTH = 600;
const HEIGHT = 200;
const PAD_LEFT = 32;
const PAD_RIGHT = 12;
const PAD_TOP = 12;
const PAD_BOTTOM = 24;

const ACCENT = '#D4B59E';

function formatShortDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale, { day: 'numeric', month: 'short' });
}

export function AttendanceChart() {
  const { t, i18n } = useTranslation();
  const points = getAttendanceTrend();
  const [hovered, setHovered] = useState<number | null>(null);

  const plotWidth = WIDTH - PAD_LEFT - PAD_RIGHT;
  const plotHeight = HEIGHT - PAD_TOP - PAD_BOTTOM;

  const x = (i: number) => PAD_LEFT + (i / Math.max(1, points.length - 1)) * plotWidth;
  const y = (rate: number) => PAD_TOP + plotHeight - (rate / 100) * plotHeight;

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(p.presentRate)}`).join(' ');
  const areaPath = `${linePath} L ${x(points.length - 1)} ${PAD_TOP + plotHeight} L ${x(0)} ${PAD_TOP + plotHeight} Z`;

  const yTicks = [0, 50, 100];
  const labelIndexes = new Set([0, Math.floor((points.length - 1) / 2), points.length - 1]);

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-4 text-sm font-semibold text-[#F9F6F0]">
          {t('teacherPages.dashboard.charts.attendanceTitle')}
        </h3>

        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" role="img" aria-label={t('teacherPages.dashboard.charts.attendanceTitle')}>
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
                {tick}%
              </text>
            </g>
          ))}

          <path d={areaPath} fill={ACCENT} opacity={0.1} stroke="none" />
          <path d={linePath} fill="none" stroke={ACCENT} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

          {points.map((p, i) => (
            <g key={p.date}>
              {labelIndexes.has(i) && (
                <text x={x(i)} y={HEIGHT - 6} textAnchor="middle" className="fill-[rgba(249,246,240,0.45)] text-[9px]">
                  {formatShortDate(p.date, i18n.language)}
                </text>
              )}
              <circle
                cx={x(i)}
                cy={y(p.presentRate)}
                r={4}
                fill={ACCENT}
                stroke="#21483F"
                strokeWidth={2}
                tabIndex={0}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                className="cursor-pointer outline-none"
              />
              <circle cx={x(i)} cy={y(p.presentRate)} r={12} fill="transparent" className="cursor-pointer" onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} />
            </g>
          ))}

          {hovered !== null && (
            <g>
              <line
                x1={x(hovered)}
                x2={x(hovered)}
                y1={PAD_TOP}
                y2={PAD_TOP + plotHeight}
                stroke="rgba(249,246,240,0.2)"
                strokeWidth={1}
              />
              <rect
                x={Math.min(Math.max(x(hovered) - 38, 0), WIDTH - 76)}
                y={y(points[hovered].presentRate) - 34}
                width={76}
                height={26}
                rx={6}
                fill="#0F2520"
                stroke="rgba(212,181,158,0.3)"
              />
              <text
                x={Math.min(Math.max(x(hovered), 38), WIDTH - 38)}
                y={y(points[hovered].presentRate) - 21}
                textAnchor="middle"
                className="fill-[#F9F6F0] text-[10px] font-semibold"
              >
                {points[hovered].presentRate}%
              </text>
              <text
                x={Math.min(Math.max(x(hovered), 38), WIDTH - 38)}
                y={y(points[hovered].presentRate) - 11}
                textAnchor="middle"
                className="fill-[rgba(249,246,240,0.55)] text-[8px]"
              >
                {formatShortDate(points[hovered].date, i18n.language)}
              </text>
            </g>
          )}
        </svg>
      </CardContent>
    </Card>
  );
}
