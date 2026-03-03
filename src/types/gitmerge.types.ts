// src/types/gitmerge.types.ts
export interface GitMergeGameProps {
  isMobile: boolean;
}

export interface Conflict {
  id: number;
  file: string;
  current: string;
  incoming: string;
  difficulty: 'easy' | 'medium' | 'hard';
  correctChoice: 'current' | 'incoming' | 'both';
  explanation: string;
}
