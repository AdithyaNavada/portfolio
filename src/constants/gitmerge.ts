// src/constants/gitmerge.ts
export const GITMERGE_DATA = {
  conflicts: [
    {
      id: 1,
      file: 'config.json',
      current: '{\n  "apiUrl": "https://api.prod.com",\n  "timeout": 5000\n}',
      incoming: '{\n  "apiUrl": "https://api.dev.com",\n  "timeout": 3000\n}',
      difficulty: 'easy',
      correctChoice: 'current',
      explanation: 'Production API URL should be kept in main branch'
    },
    {
      id: 2,
      file: 'package.json',
      current: '{\n  "name": "my-app",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^18.0.0"\n  }\n}',
      incoming: '{\n  "name": "my-app",\n  "version": "1.1.0",\n  "dependencies": {\n    "react": "^18.0.0",\n    "typescript": "^5.0.0"\n  }\n}',
      difficulty: 'medium',
      correctChoice: 'both',
      explanation: 'Both versions add TypeScript dependency - merge both changes'
    },
    {
      id: 3,
      file: 'styles.css',
      current: 'body { margin: 0; padding: 20px; }',
      incoming: 'body { margin: 0; padding: 0; }',
      difficulty: 'hard',
      correctChoice: 'incoming',
      explanation: 'Remove padding for better mobile responsiveness'
    },
    {
      id: 4,
      file: 'README.md',
      current: '# Project Documentation\\n\\n## Features\\n- User authentication\\n- Data visualization',
      incoming: '# Project Documentation\\n\\n## Features\\n- User authentication\\n- Data visualization\\n- Real-time updates',
      difficulty: 'medium',
      correctChoice: 'both',
      explanation: 'Both add real-time updates feature - combine both'
    },
    {
      id: 5,
      file: '.env',
      current: 'API_KEY=prod_key_123',
      incoming: 'API_KEY=dev_key_456',
      difficulty: 'hard',
      correctChoice: 'current',
      explanation: 'Never merge production secrets into development branch'
    }
  ]
} as const;
