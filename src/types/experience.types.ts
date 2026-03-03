// src/types/experience.types.ts
export interface ExperiencePageProps {
  openContactWindow?: () => void;
}

export interface Achievement {
  title: string;
  description: string;
  impact: string;
  level: number;
}

export interface Experience {
  company: string;
  role: string;
  type: string;
  duration: string;
  status: string;
  icon: string;
  color: string;
  technologies: string[];
  achievements: Achievement[];
}
