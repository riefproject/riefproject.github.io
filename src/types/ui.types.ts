export interface TabItem {
  key: string
  labelEn: string
  labelId: string
  logo?: string
  logoLight?: string
  icon?: string
  count?: string | number
}

export interface StatItem {
  label: string
  value: string | number
  unit?: string
  variant?: string
  helper?: string
}
