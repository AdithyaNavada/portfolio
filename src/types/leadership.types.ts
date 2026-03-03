// src/types/leadership.types.ts
export interface LeadershipPageProps {
  openContactWindow?: () => void;
}

export interface Achievement {
  title: string;
  event: string;
  description: string;
  impact: string;
  level: number;
}

export interface TechnicalItem {
  type: string;
  achievements: Achievement[];
}

export interface Highlight {
  title: string;
  description: string;
  metric: string;
  category: string;
}

export interface CollaborationArea {
  skill: string;
  context: string;
  strength: number;
}

export interface Philosophy {
  quote: string;
  keywords: string[];
}
