// src/constants/window-defaults.ts
export const WINDOW_SIZES: Record<string, { width: number; height: number }> = {
  default: { width: 800, height: 600 },
  gameoflife: { width: 700, height: 650 },
  '2048': { width: 600, height: 750 },
  gitmerge: { width: 900, height: 700 },
  doom: { width: 640, height: 480 },
};

export function getWindowSize(type: string, isMobile: boolean) {
  if (isMobile) return { width: window.innerWidth, height: window.innerHeight - 50 };
  return WINDOW_SIZES[type] ?? WINDOW_SIZES.default;
}
