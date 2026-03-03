// src/types/education.types.ts
export interface Degree {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  status: string;
  specialization: string;
  focus: string;
  icon: string;
  color: string;
  highlights: string[];
  gpa: string;
  year: string;
}

export interface LearningArea {
  area: string;
  icon: string;
  color: string;
  description: string;
  projects: string[];
}

export interface CurrentFocus {
  topic: string;
  icon: string;
  progress: number;
  description: string;
}

export interface EducationPageProps {
  openContactWindow?: () => void;
}
