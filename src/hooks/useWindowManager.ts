// src/hooks/useWindowManager.ts
import { useState } from 'react';
import type { WindowData } from '../types/window.types';
import { getWindowSize } from '../constants/window-defaults';

export function useWindowManager(isMobile: boolean) {
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1000);
  const [windowHistory, setWindowHistory] = useState<string[]>([]);

  const openWindow = (type: string) => {
    const existingWindow = windows.find(w => w.component === type && !w.isMinimized);
    if (existingWindow) {
      bringToFront(existingWindow.id);
      setWindowHistory(prev => [...prev.filter(id => id !== existingWindow.id), existingWindow.id]);
      return;
    }

    const minimizedWindow = windows.find(w => w.component === type && w.isMinimized);
    if (minimizedWindow) {
      restoreWindow(minimizedWindow.id);
      setWindowHistory(prev => [...prev.filter(id => id !== minimizedWindow.id), minimizedWindow.id]);
      return;
    }

    const { width: windowWidth, height: windowHeight } = getWindowSize(type, isMobile);
    const windowX = isMobile ? 0 : (100 + windows.length * 30);
    const windowY = isMobile ? 50 : (100 + windows.length * 30);

    const newWindow: WindowData = {
      id: `${type}-${Date.now()}`,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      component: type,
      isMinimized: false,
      isMaximized: isMobile,
      position: { x: windowX, y: windowY },
      size: { width: windowWidth, height: windowHeight },
      zIndex: nextZIndex,
    };

    setWindows(prev => [...prev, newWindow]);
    setWindowHistory(prev => [...prev, newWindow.id]);
    setNextZIndex(prev => prev + 1);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    setWindowHistory(prev => {
      const filtered = prev.filter(wId => wId !== id);
      if (filtered.length > 0 && isMobile) {
        const lastWindowId = filtered[filtered.length - 1];
        restoreWindow(lastWindowId);
      }
      return filtered;
    });
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isMinimized: true } : w
    ));
    setWindowHistory(prev => {
      const filtered = prev.filter(wId => wId !== id);
      if (filtered.length > 0 && isMobile) {
        const lastWindowId = filtered[filtered.length - 1];
        restoreWindow(lastWindowId);
      }
      return filtered;
    });
  };

  const maximizeWindow = (id: string) => {
    if (isMobile) return;

    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        if (w.isMaximized) {
          // Un-maximize: restore to a default centered position with original size
          const { width: originalWidth, height: originalHeight } = getWindowSize(w.component, false);
          
          // Center the window
          const newX = (window.innerWidth - originalWidth) / 2;
          const newY = (window.innerHeight - 50 - originalHeight) / 2;

          return {
            ...w,
            isMaximized: false,
            position: { x: Math.max(0, newX), y: Math.max(50, newY) },
            size: { width: originalWidth, height: originalHeight }
          };
        } else {
          // Maximize: full screen
          return {
            ...w,
            isMaximized: true,
            position: { x: 0, y: 0 },
            size: { width: window.innerWidth, height: window.innerHeight - 50 }
          };
        }
      }
      return w;
    }));
  };

  const bringToFront = (id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, zIndex: nextZIndex } : w
    ));
    setWindowHistory(prev => [...prev.filter(wId => wId !== id), id]);
    setNextZIndex(prev => prev + 1);
  };

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, position } : w
    ));
  };

  const restoreWindow = (id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isMinimized: false } : w
    ));
    bringToFront(id);
  };

  const isAppMinimized = (appName: string) => {
    return windows.some(w => w.component === appName && w.isMinimized);
  };

  const getCurrentWindow = () => {
    if (windowHistory.length === 0) return null;
    const currentId = windowHistory[windowHistory.length - 1];
    return windows.find(w => w.id === currentId && !w.isMinimized);
  };

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    bringToFront,
    updateWindowPosition,
    restoreWindow,
    isAppMinimized,
    getCurrentWindow
  };
}
