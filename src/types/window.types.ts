// src/types/window.types.ts
export interface WindowData {
  id: string;
  title: string;
  component: string;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export interface AppItem {
  folderId: string;
  name: string;
  icon: string;
  title: string;
  isFolder?: boolean;
}
