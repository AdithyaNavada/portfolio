// src/constants/leadership.ts
export const LEADERSHIP_DATA = {
  technical: {
    title: 'Technical Leadership',
    icon: '👥',
    color: 'blue',
    items: [
      {
        type: 'Academic & Club Leadership',
        achievements: [
          {
            title: 'President – Byte Coffee CS Club',
            event: 'KLE College',
            description: 'Led technical events, coordinated workshops, and guided peers in development initiatives',
            impact: 'Community Leadership',
            level: 95
          },
          {
            title: 'Class Representative',
            event: 'BSc Program',
            description: 'Acted as liaison between faculty and students ensuring smooth academic coordination',
            impact: 'Organizational Responsibility',
            level: 90
          }
        ]
      },
      {
        type: 'Hackathons & Competitions',
        achievements: [
          {
            title: '4th Place – Figmathon Design Competition',
            event: 'Design & Innovation Challenge',
            description: 'Delivered creative UI/UX solution under competitive time constraints',
            impact: 'Competitive Recognition',
            level: 88
          },
          {
            title: 'Academic Scholarship Recipient',
            event: 'PES University',
            description: 'Recognized for consistent academic excellence and performance',
            impact: 'Merit-Based Achievement',
            level: 92
          }
        ]
      },
      {
        type: 'Independent Technical Initiatives',
        achievements: [
          {
            title: 'AI-Driven Intrusion Detection System',
            event: 'Cybersecurity Research Project',
            description: 'Designed and deployed ML-based IDS using Docker achieving 91% accuracy',
            impact: 'Research & Innovation',
            level: 91
          },
          {
            title: 'Real-Time Systems Development',
            event: 'Full-Stack Projects',
            description: 'Built scalable real-time chat applications and automation-driven platforms',
            impact: 'System Architecture',
            level: 89
          }
        ]
      }
    ]
  },

  impact: {
    title: 'Technical Impact',
    icon: '🌟',
    color: 'green',
    highlights: [
      {
        title: 'Production Systems',
        description: 'Contributed to real-world SaaS platforms used by enterprise clients',
        metric: '100%',
        category: 'Professional'
      },
      {
        title: 'Automation & Workflow Systems',
        description: 'Implemented Temporal & N8N workflows reducing manual operational tasks',
        metric: '95%',
        category: 'Automation'
      },
      {
        title: 'AI & ML Applications',
        description: 'Delivered ML-powered intrusion detection and predictive systems',
        metric: '91%',
        category: 'AI/ML'
      },
      {
        title: 'Scalable Architecture',
        description: 'Designed modular backend services using Fastify and Prisma',
        metric: '92%',
        category: 'Backend'
      }
    ]
  },

  collaboration: {
    title: 'Collaboration & Mentorship',
    icon: '🤝',
    color: 'purple',
    areas: [
      {
        skill: 'Agile Team Collaboration',
        context: 'Professional SDE-1 role',
        strength: 92
      },
      {
        skill: 'Knowledge Sharing',
        context: 'Club leadership & project documentation',
        strength: 88
      },
      {
        skill: 'Cross-Functional Communication',
        context: 'Enterprise product development',
        strength: 90
      }
    ]
  },

  philosophy: {
    quote:
      "I believe leadership in technology is about building scalable systems, sharing knowledge openly, and creating solutions that make a measurable real-world impact.",
    keywords: [
      'scalable systems',
      'knowledge sharing',
      'automation',
      'innovation',
      'real-world impact'
    ]
  }
} as const;