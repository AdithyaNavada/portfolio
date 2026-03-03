// src/types/game2048.types.ts
export interface Game2048Props {
  isMobile: boolean;
}

export type Board = number[][];

export interface TouchStart {
  x: number;
  y: number;
}
