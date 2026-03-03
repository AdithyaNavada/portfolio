// src/types/gameoflife.types.ts
export interface GameOfLifePageProps {
  isMobile?: boolean;
}

export interface GridDimensions {
  rows: number;
  cols: number;
}

export interface Pattern {
  name: string;
  icon: string;
  pattern: number[][];
}

export interface GameCell {
  x: number;
  y: number;
  alive: boolean;
}
