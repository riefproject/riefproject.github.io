export interface HeatmapTooltipMetric {
  value: number | string;
  label?: string;
  logo?: string;
  logoLight?: string;
  color?: 'sky' | 'emerald' | 'orange' | 'purple' | 'amber' | 'slate' | 'neutral' | string;
}

export interface HeatmapDayItem {
  date: string;
  count: number;
  tries?: number;
  ac?: number;
  github?: number;
  gitlab?: number;
  level: number;
  metrics?: HeatmapTooltipMetric[];
}

export const getHeatmapLevel = (count: number): number => {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 6) return 2;
  if (count <= 14) return 3;
  return 4;
};

export const buildHeatmapDays = (
  map: Record<string, any> = {},
  extract: (v: any) => { count: number; tries?: number; ac?: number; github?: number; gitlab?: number } = (v) => {
    if (typeof v === 'number') return { count: v };
    if (v && typeof v === 'object') {
      const count = Number(v.count || v.tries || 0);
      const res: any = { count };
      if (typeof v.tries === 'number') res.tries = v.tries;
      if (typeof v.ac === 'number') res.ac = v.ac;
      if (typeof v.github === 'number') res.github = v.github;
      if (typeof v.gitlab === 'number') res.gitlab = v.gitlab;
      return res;
    }
    return { count: 0 };
  }
): HeatmapDayItem[] => {
  const today = new Date();
  const days: HeatmapDayItem[] = [];

  for (let i = 363; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    const entry = map?.[dateStr];
    const data = extract(entry);

    const item: HeatmapDayItem = {
      date: dateStr,
      count: data.count,
      level: getHeatmapLevel(data.count),
    };
    if (typeof data.tries === 'number') item.tries = data.tries;
    if (typeof data.ac === 'number') item.ac = data.ac;
    if (typeof data.github === 'number') item.github = data.github;
    if (typeof data.gitlab === 'number') item.gitlab = data.gitlab;

    days.push(item);
  }
  return days;
};

export const toWeeks = (days: HeatmapDayItem[]): HeatmapDayItem[][] => {
  const weeks: HeatmapDayItem[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
};

export const buildMonths = (weeks: HeatmapDayItem[][]): Array<{ name: string; percent: number }> => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const res: { name: string; percent: number }[] = [];
  const totalWeeks = weeks.length;

  weeks.forEach((w, idx) => {
    if (w[0]) {
      const d = new Date(w[0].date);
      if (d.getDate() <= 7) {
        res.push({
          name: months[d.getMonth()],
          percent: Math.round((idx / totalWeeks) * 100),
        });
      }
    }
  });
  return res;
};

export const formatRelativeTime = (isoString?: string, isId: boolean = false): string => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSec < 60) return isId ? 'baru saja' : 'just now';
  if (diffSec < 3600) return isId ? `${Math.floor(diffSec / 60)} mnt lalu` : `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return isId ? `${Math.floor(diffSec / 3600)} jam lalu` : `${Math.floor(diffSec / 3600)}h ago`;
  if (diffSec < 2592000) return isId ? `${Math.floor(diffSec / 86400)} hari lalu` : `${Math.floor(diffSec / 86400)}d ago`;

  return date.toLocaleDateString(isId ? 'id-ID' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatTooltipHeaderDate = (dateStr: string, isId: boolean = false): string => {
  const dateObj = new Date(dateStr + 'T00:00:00');
  return dateObj.toLocaleDateString(isId ? 'id-ID' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const formatExactDate = (isoString?: string, isId: boolean = false): string => {
  if (!isoString) return '-';
  const date = new Date(isoString);
  return date.toLocaleDateString(isId ? 'id-ID' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
