// src/utils/window-sizing.ts
import { WINDOW_SIZES } from '../constants/window-defaults';

export function getWindowSize(type: string, isMobile: boolean) {
  if (isMobile) return { width: window.innerWidth, height: window.innerHeight - 50 };
  return WINDOW_SIZES[type] ?? WINDOW_SIZES.default;
}
