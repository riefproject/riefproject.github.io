export interface DevHeatmapDay {
  date: string;
  count: number;
  level: number;
}

export const getLevel = (count: number): number => {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 6) return 2;
  if (count <= 14) return 3;
  return 4;
};

export const buildHeatmapDays = (
  map: Record<string, any>,
  extract: (v: any) => number = (v) => (typeof v === 'object' ? Number(v?.count || 0) : Number(v || 0))
): DevHeatmapDay[] => {
  const today = new Date();
  const days: DevHeatmapDay[] = [];
  for (let i = 363; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    const entry = map?.[dateStr];
    const count = extract(entry);
    days.push({ date: dateStr, count, level: getLevel(count) });
  }
  return days;
};

export const toWeeks = (days: DevHeatmapDay[]): DevHeatmapDay[][] => {
  const weeks: DevHeatmapDay[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  return weeks;
};

export const buildMonths = (weeks: DevHeatmapDay[][]): Array<{ name: string; percent: number }> => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const res: { name: string; percent: number }[] = [];
  const totalWeeks = weeks.length;
  weeks.forEach((w, idx) => {
    if (w[0]) {
      const d = new Date(w[0].date);
      if (d.getDate() <= 7) {
        res.push({ name: months[d.getMonth()], percent: Math.round((idx / totalWeeks) * 100) });
      }
    }
  });
  return res;
};

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

export const formatRelativeTime = (isoString?: string, isId: boolean = false): string => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const diffSec = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (diffSec < 60) return isId ? 'baru saja' : 'just now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  if (diffSec < 2592000) return `${Math.floor(diffSec / 86400)}d ago`;
  return date.toLocaleDateString(isId ? 'id-ID' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
