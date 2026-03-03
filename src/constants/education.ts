// src/constants/education.ts
export const EDUCATION_DATA = {
  degrees: [
    {
      id: 'mca',
      degree: 'Master of Computer Applications (M.C.A)',
      institution: 'PES University',
      duration: '2023 - 2025',
      status: 'Completed',
      specialization: 'Data Analytics',
      focus: 'Full Stack Development, Data Science, AI/ML',
      icon: '🎯',
      color: 'green',
      highlights: [
        'Advanced Data Analytics & Visualization',
        'Enterprise Application Development',
        'Machine Learning & AI Implementation',
        'Full Stack Web Development'
      ],
      gpa: 'Current: 7.9/10',
      year: 'Post Graduate'
    },
    {
      id: 'bca',
      degree: 'Bachelor of Science (B.Sc)',
      institution: 'KLE S Nijalingappa College',
      duration: '2020 - 2023',
      status: 'Completed',
      specialization: 'Computer Science Foundation',
      focus: 'Programming Fundamentals & Software Development',
      icon: '🎓',
      color: 'green',
      highlights: [
        'Core Programming Languages',
        'Database Management Systems',
        'Software Engineering Principles',
        'Web Development Fundamentals'
      ],
      gpa: 'Final: 9.2/10',
      year: 'Graduate'
    }
  ],
  specializedLearning: [
    {
      area: 'Advanced Reinforcement Learning & AI',
      icon: '🤖',
      color: 'purple',
      description: 'Deep dive into PPO algorithms and game-based AI research',
      projects: ['ViZDoom AI Agent', 'PPO Implementation']
    },
    {
      area: 'Enterprise Application Development',
      icon: '🏢',
      color: 'indigo',
      description: 'Building scalable, production-ready applications',
      projects: ['SharePoint Framework Solutions', 'Spring Boot Applications']
    },
    {
      area: 'Modern Web Development Frameworks',
      icon: '🌐',
      color: 'cyan',
      description: 'Cutting-edge frontend and backend technologies',
      projects: ['React TypeScript Apps', 'REST API Development']
    },
    {
      area: 'Data Analytics and Visualization',
      icon: '📊',
      color: 'orange',
      description: 'Transforming data into actionable insights',
      projects: ['Interactive Dashboards', 'ML Model Visualization']
    }
  ],
  currentFocus: [
    {
      topic: 'Machine Learning in Production Environments',
      icon: '⚙️',
      progress: 75,
      description: 'Deploying ML models at scale'
    },
    {
      topic: 'Enterprise-grade React TypeScript Applications',
      icon: '⚛️',
      progress: 85,
      description: 'Building robust, type-safe web applications'
    }
  ]
} as const;
