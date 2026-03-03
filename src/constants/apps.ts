// src/constants/apps.ts
export const DESKTOP_APPS = [
  { name: 'about', icon: '🧑‍💼', title: 'About' },
  { name: 'projects', icon: '🗂️', title: 'Projects' },
  { name: 'skills', icon: '⚙️', title: 'Skills' },
  { name: 'experience', icon: '📊', title: 'Experience' },
  { name: 'contact', icon: '☎️', title: 'Contact' },
  { name: 'education', icon: '🏫', title: 'Education' },
  { name: 'leadership', icon: '👑', title: 'Leadership' },
  { name: 'help', icon: '🆘', title: 'Help' },
  { name: '2048', icon: '🎮', title: '2048' },
  { name: 'gitmerge', icon: '🔀', title: 'Git Game Merge' },
  { name: 'gameoflife', icon: '🧬', title: 'Game of Life' },
  { name: 'github', icon: '🐱', title: 'GitHub' },
  { name: 'linkedin', icon: '💼', title: 'LinkedIn' },
  { name: 'email', icon: '✉️', title: 'Mail' },
] as const;

export const TASKBAR_QUICK_APPS = ['about', 'contact', 'linkedin', 'email'] as const;

export const EXTERNAL_LINKS: Record<string, string> = {
  github: 'https://github.com/AdithyaNavada',
  linkedin: 'https://linkedin.com/in/adithya-p-navada-56b464301',
  email: 'mailto:adithya1629@gmail.com',
};
