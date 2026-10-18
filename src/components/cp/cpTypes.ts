export type CpColumnKey = 'category' | 'difficulty' | 'language';

export interface CpColumn {
  key: CpColumnKey;
  labelEn: string;
  labelId: string;
}

export type CpMetricVariant = 'emerald' | 'sky' | 'amber' | 'purple' | 'rose';

export interface CpMetric {
  label: string;
  value: string | number;
  sub?: string;
  subHtml?: string;
  variant?: CpMetricVariant;
}
