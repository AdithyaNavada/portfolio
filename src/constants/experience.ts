// src/constants/experience.ts
export const EXPERIENCE_DATA = {
  defydFullTime: {
    company: 'Defyd India Pvt Ltd',
    role: 'Software Developer (SDE-1)',
    type: 'Full Time',
    duration: 'July 2025 – Present',
    status: 'Ongoing',
    icon: '🏢',
    color: 'blue',
    technologies: [
      'Next.js',
      'TypeScript',
      'Node.js',
      'Fastify',
      'GraphQL',
      'PostgreSQL',
      'Prisma',
      'Redis',
      'Docker',
      'Temporal',
      'N8N',
      'WhatsApp Business API'
    ],
    achievements: [
      {
        title: 'White Labeling Architecture',
        description: 'Delivered end-to-end white labeling feature enabling custom branding for enterprise clients',
        impact: 'Improved enterprise client onboarding',
        level: 95
      },
      {
        title: 'Scalable Backend Systems',
        description: 'Built RESTful APIs, middleware, services and schema-protected Fastify routes with complex filtering',
        impact: 'Improved backend reliability and scalability',
        level: 92
      },
      {
        title: 'Workflow & Automation Systems',
        description: 'Designed Temporal workflows and N8N automations for notifications, booking processing and OTA email monitoring',
        impact: 'Reduced manual intervention & improved processing speed',
        level: 93
      },
      {
        title: 'AI & WhatsApp Integration',
        description: 'Built AI agent workflows and WhatsApp-based booking management system with intelligent prompts and tools',
        impact: 'Enabled conversational booking experience',
        level: 90
      }
    ]
  },

  defydIntern: {
    company: 'Defyd India Pvt Ltd',
    role: 'Software Developer Intern (SDE-0)',
    type: 'Internship',
    duration: 'March 2025 – June 2025',
    status: 'Completed',
    icon: '🚀',
    color: 'purple',
    technologies: [
      'Next.js',
      'TypeScript',
      'Fastify',
      'PostgreSQL',
      'Prisma',
      'Docker',
      'BullMQ',
      'Nx Monorepo'
    ],
    achievements: [
      {
        title: 'Full-Stack Feature Development',
        description: 'Developed end-to-end features in Nx monorepo architecture using Next.js and Fastify',
        impact: 'Production-ready scalable features',
        level: 90
      },
      {
        title: 'Database Optimization',
        description: 'Implemented optimized PostgreSQL queries using Prisma ORM for real-time features',
        impact: 'Improved performance & response time',
        level: 88
      },
      {
        title: 'Containerized Deployments',
        description: 'Used Docker for service isolation and BullMQ for background job processing',
        impact: 'Reliable background task execution',
        level: 85
      }
    ]
  }
} as const;