
export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  graduationDate: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
  technologies: string[];
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export interface CustomStyle {
  primaryColor: string;
  accentColor: string;
  fontFamily: 'sans' | 'serif' | 'mono';
  fontSize: string;
  spacing: string;
  borderRadius: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications: string[];
  achievements: string[];
  languages: string[];
  customSections: CustomSection[];
  customStyle?: CustomStyle;
}

export enum TemplateId {
  MODERN = 'modern',
  MINIMAL = 'minimal',
  CORPORATE = 'corporate',
  NOIR = 'noir',
  NEON = 'neon',
  ROYAL = 'royal',
  CUSTOM = 'custom'
}

export type UITheme = 'onyx' | 'crystal' | 'forge';
