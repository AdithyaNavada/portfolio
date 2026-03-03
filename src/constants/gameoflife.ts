// src/constants/gameoflife.ts
export const GAME_OF_LIFE_CONFIG = {
  patterns: {
    glider: [[0, 1], [1, 2], [2, 0], [1, -1]] as number[][],
    pulsar: [[2, 0], [2, 1], [2, 2], [2, 6], [2, 7], [2, 8]] as number[][],
    blinker: [[0, 0], [0, 1], [1, 0], [0, 0]] as number[][]
  },
  colors: {
    alive: '#10b981',
    dead: '#3b82f6',
    grid: '#1e293b',
    background: '#0f172a'
  },
  rules: {
    birth: [3],
    survive: [2, 3]
  },
  defaults: {
    speed: 100,
    cellSize: {
      mobile: 8,
      desktop: 10
    },
    gridDimensions: {
      mobile: { width: 300, height: 400 },
      desktop: { width: 600, height: 500 }
    }
  }
} as const;
