// src/types/projects.types.ts
export interface ProjectFeature {
  title: string;
  description: string;
  icon: string;
  impact: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  icon: string;
  color: string;
  tagline: string;
  technologies: string[];
  description: string;
  features: ProjectFeature[];
}

export interface ProjectsPageProps {
  openContactWindow?: () => void;
}
