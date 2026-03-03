// src/types/skills.types.ts
export interface SkillsPageProps {
  openContactWindow?: () => void;
}

export interface Skill {
  name: string;
  level: number;
  description: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  color: string;
  skills: Skill[];
}
