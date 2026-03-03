// src/utils/sort.ts
import type { AppItem } from '../types/window.types';

export function getSortedApps(
  filteredApps: AppItem[], 
  folders: Array<{ id: string; name: string; isEditing: boolean }>, 
  sortOrder: 'default' | 'a-z' | 'z-a'
) {
  const allApps = [...filteredApps, ...folders.map(folder => ({
    name: folder.id,
    icon: '📁',
    title: folder.name,
    isFolder: true,
    folderId: folder.id
  }))];

  switch (sortOrder) {
    case 'a-z':
      return allApps.sort((a, b) => a.title.localeCompare(b.title));
    case 'z-a':
      return allApps.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return allApps;
  }
}
