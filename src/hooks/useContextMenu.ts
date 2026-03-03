// src/hooks/useContextMenu.ts
import { useState } from 'react';

export function useContextMenu() {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; visible: boolean }>({ x: 0, y: 0, visible: false });

  const handleContextMenu = (e: React.MouseEvent, isMobile: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isMobile) {
      setContextMenu({
        x: e.clientX,
        y: e.clientY,
        visible: true
      });
    }
  };

  const closeContextMenu = () => {
    setContextMenu({ x: 0, y: 0, visible: false });
  };

  return {
    contextMenu,
    handleContextMenu,
    closeContextMenu
  };
}
