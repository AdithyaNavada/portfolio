// src/constants/help.ts
export const HELP_DATA = {
  apps: [
    {
      id: 'about',
      title: 'About',
      icon: '👨‍💻',
      color: 'emerald',
      description: 'Learn about my background, passion, and what drives me as a developer.'
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: '🚀',
      color: 'purple',
      description: 'Explore my latest work, from web applications to innovative solutions.'
    },
    {
      id: 'skills',
      title: 'Skills',
      icon: '⚡',
      color: 'amber',
      description: 'Discover my technical expertise across programming languages and frameworks.'
    },
    {
      id: 'experience',
      title: 'Experience',
      icon: '💼',
      color: 'blue',
      description: 'View my professional journey through internships and technical growth.'
    },
    {
      id: 'education',
      title: 'Education',
      icon: '🎓',
      color: 'indigo',
      description: 'Explore my academic background and specialized learning paths.'
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: '📧',
      color: 'rose',
      description: 'Get in touch - I\'m always open to discussing new opportunities!'
    }
  ],
  tips: [
    'Click and drag any window to reposition it on the desktop',
    'Double-click the title bar to maximize any window',
    'Right-click on the desktop for quick access to system menu',
    'Use the taskbar to quickly switch between open applications',
    'Adjust brightness and volume using the system menu for better viewing experience',
    'Try the interactive games for a fun break from serious work!'
  ],
  shortcuts: [
    { key: 'Alt + Tab', action: 'Switch between open windows' },
    { key: 'Alt + F4', action: 'Close current window' },
    { key: 'Win + D', action: 'Show desktop' },
    { key: 'Win + E', action: 'Open File Explorer' },
    { key: 'Win + R', action: 'Run dialog' }
  ]
} as const;
