// src/constants/game2048.ts
export const GAME_2048_CONFIG = {
  boardSize: 4,
  colors: {
    empty: 'bg-slate-700/30',
    2: 'bg-amber-100 text-slate-800',
    4: 'bg-amber-200 text-slate-800',
    8: 'bg-orange-400 text-white',
    16: 'bg-orange-500 text-white',
    32: 'bg-orange-600 text-white',
    64: 'bg-red-500 text-white',
    128: 'bg-yellow-400 text-white',
    256: 'bg-yellow-500 text-white',
    512: 'bg-yellow-600 text-white',
    1024: 'bg-purple-500 text-white',
    2048: 'bg-purple-600 text-white'
  },
  thresholds: {
    touchThreshold: 30,
    winScore: 2048
  }
} as const;
