export interface HeatmapTooltipMetric {
  value: number | string;
  label?: string;
  logo?: string;
  logoLight?: string;
  color?: 'sky' | 'emerald' | 'orange' | 'purple' | 'amber' | 'slate' | 'neutral' | string;
}

export interface HeatmapDay {
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
  },
  options: {
    daysBack?: number;
    utcDate?: boolean;
    levelFor?: (count: number) => number;
  } = {}
): HeatmapDay[] => {
  const { daysBack = 364, utcDate = false, levelFor = getHeatmapLevel } = options;
  const today = new Date();
  const days: HeatmapDay[] = [];

  for (let i = daysBack - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = utcDate
      ? d.toISOString().slice(0, 10)
      : `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const entry = map?.[dateStr];
    const data = extract(entry);

    const item: HeatmapDay = {
      date: dateStr,
      count: data.count,
      level: levelFor(data.count),
    };
    if (typeof data.tries === 'number') item.tries = data.tries;
    if (typeof data.ac === 'number') item.ac = data.ac;
    if (typeof data.github === 'number') item.github = data.github;
    if (typeof data.gitlab === 'number') item.gitlab = data.gitlab;

    days.push(item);
  }
  return days;
};

export const toWeeks = <T>(days: T[], size = 7): T[][] => {
  const weeks: T[][] = [];
  for (let i = 0; i < days.length; i += size) {
    weeks.push(days.slice(i, i + size));
  }
  return weeks;
};

export const buildMonths = <T extends { date: string }>(weeks: T[][]): Array<{ name: string; percent: number }> => {
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
