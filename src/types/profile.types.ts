export type LocaleText = {
  en: string;
  id: string;
};

const t = (en: string, id: string): LocaleText => ({ en, id });

export type Profile = {
  name: string;
  role: LocaleText;
  tagline: LocaleText;
  location: LocaleText;
  photo?: string;
  availability: LocaleText;
  intro: LocaleText;
  bio: LocaleText;
  focusStack: LocaleText;
  resumeUrl?: string;
};

export type Highlight = {
  label: LocaleText;
  detail: LocaleText;
};

export type Stat = {
  label: LocaleText;
  value: string;
  helper?: LocaleText;
};

export type SocialLink = {
  label: string;
  url: string;
  hint?: string;
};

export type CPProfile = {
  platform: string;
  handle: string;
  url: string;
  logo?: string;
  note?: LocaleText;
};

export type TechStack = {
  name: string;
  category: "language" | "framework" | "tool";
  logoDark?: string;
  logoLight?: string;
};

export type FocusArea = {
  title: LocaleText;
  description: LocaleText;
  items: LocaleText[];
};

export type SkillCategory = {
  title: LocaleText;
  items: LocaleText[];
  helper?: LocaleText;
};

export type Experience = {
  company: string;
  logo?: string;
  role: LocaleText;
  period: string;
  summary: LocaleText;
  stack: string[];
  achievements: LocaleText[];
};

export type Education = {
  institution: string;
  logo?: string;
  program: LocaleText;
  period: string;
  details: LocaleText[];
};

export type AchievementType = "competitions" | "certifications" | "bootcamps";

export type Achievement = {
  type: AchievementType;
  title: LocaleText;
  issuer: LocaleText;
  date: string;
  highlight?: LocaleText;
  link?: string;
  logo?: string;
  credentialId?: string;
  credentialUrl?: string;
  certificateImage?: string | string[];
};

export type AchievementTab = {
  id: AchievementType;
  name: LocaleText;
};

export type Project = {
  title: LocaleText;
  img?: string;
  description: LocaleText;
  impact?: LocaleText;
  year: number;
  category: LocaleText;
  categoryKey: string;
  stack: string[];
  highlights: LocaleText[];
  links?: {
    label: LocaleText;
    url: string;
  }[];
  featured?: boolean;
};

export type Contact = {
  email: string;
  message: LocaleText;
  availabilityNote: LocaleText;
};

export { t };
