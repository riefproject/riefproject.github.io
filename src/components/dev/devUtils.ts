import type { HeatmapDayItem } from '../../utils/activityDateUtils';
import {
  getHeatmapLevel,
  buildHeatmapDays as buildDays,
  toWeeks as toW,
  buildMonths as buildM,
  formatRelativeTime,
  formatTooltipHeaderDate,
  formatExactDate,
} from '../../utils/activityDateUtils';

export type DevHeatmapDay = HeatmapDayItem;
export const getLevel = getHeatmapLevel;

export const buildHeatmapDays = (
  map: Record<string, any>,
  extract?: (v: any) => { count: number; github?: number; gitlab?: number }
): DevHeatmapDay[] => {
  return buildDays(map, (entry) => {
    if (extract) return extract(entry);
    if (typeof entry === 'object' && entry !== null) {
      const count = Number(entry?.count || 0);
      const res: any = { count };
      if (typeof entry.github === 'number') res.github = entry.github;
      if (typeof entry.gitlab === 'number') res.gitlab = entry.gitlab;
      return res;
    }
    return { count: Number(entry || 0) };
  });
};

export const toWeeks = toW;
export const buildMonths = buildM;
export { formatRelativeTime, formatTooltipHeaderDate, formatExactDate };

export const formatHeatmapTooltip = (day?: DevHeatmapDay, isId: boolean = false): string => {
  if (!day || !day.date) return '';
  const dateObj = new Date(day.date + 'T00:00:00');
  const dateFormatted = dateObj.toLocaleDateString(isId ? 'id-ID' : 'en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  if (day.count === 0) return `${dateFormatted}: ${isId ? 'Tidak ada aktivitas' : 'No activity'}`;
  return `${dateFormatted}: ${day.count} ${isId ? 'kontribusi' : 'contributions'}`;
};
