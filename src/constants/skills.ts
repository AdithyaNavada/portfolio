// src/constants/skills.ts
export const SKILLS_DATA = {
  programming: {
    title: 'Programming Languages',
    icon: '💻',
    color: 'blue',
    skills: [
      { name: 'JavaScript', level: 95, description: 'Modern ES6+ application development' },
      { name: 'TypeScript', level: 92, description: 'Type-safe scalable systems' },
      { name: 'Python', level: 88, description: 'ML systems & backend development' },
      { name: 'Java', level: 80, description: 'Object-oriented programming' },
      { name: 'SQL', level: 90, description: 'Relational database queries & optimization' }
    ]
  },

  frontend: {
    title: 'Frontend Development',
    icon: '🎨',
    color: 'purple',
    skills: [
      { name: 'Next.js', level: 92, description: 'Production-grade React frameworks' },
      { name: 'React', level: 95, description: 'Component-based architecture' },
      { name: 'HTML/CSS', level: 93, description: 'Responsive & semantic UI development' }
    ]
  },

  backend: {
    title: 'Backend Development',
    icon: '⚙️',
    color: 'green',
    skills: [
      { name: 'Node.js', level: 93, description: 'Scalable server-side applications' },
      { name: 'Fastify', level: 90, description: 'High-performance backend framework' },
      { name: 'GraphQL', level: 85, description: 'Schema-based API design' },
      { name: 'REST APIs', level: 92, description: 'Clean and scalable API architecture' },
      { name: 'Socket.IO', level: 85, description: 'Real-time bidirectional communication' }
    ]
  },

  database: {
    title: 'Databases & ORM',
    icon: '🗄️',
    color: 'orange',
    skills: [
      { name: 'PostgreSQL', level: 92, description: 'Production relational database systems' },
      { name: 'MySQL', level: 85, description: 'Structured data management' },
      { name: 'MongoDB', level: 85, description: 'NoSQL document database' },
      { name: 'Redis', level: 88, description: 'Caching & performance optimization' },
      { name: 'Prisma ORM', level: 90, description: 'Type-safe database access layer' }
    ]
  },

  devops: {
    title: 'DevOps & Automation',
    icon: '🚀',
    color: 'indigo',
    skills: [
      { name: 'Docker', level: 90, description: 'Containerized application deployment' },
      { name: 'Nx Monorepo', level: 85, description: 'Scalable monorepo architecture' },
      { name: 'Temporal', level: 85, description: 'Workflow orchestration systems' },
      { name: 'N8N', level: 88, description: 'Automation & workflow pipelines' },
      { name: 'BullMQ', level: 85, description: 'Background job processing' },
      { name: 'Git/GitHub', level: 95, description: 'Version control & collaboration' }
    ]
  },

  ml: {
    title: 'Machine Learning & Data',
    icon: '🤖',
    color: 'red',
    skills: [
      { name: 'scikit-learn', level: 88, description: 'Model training & evaluation' },
      { name: 'Pandas', level: 90, description: 'Data preprocessing & manipulation' },
      { name: 'Data Analysis', level: 85, description: 'Feature engineering & insights' }
    ]
  }
} as const;