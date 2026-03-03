// src/constants/profile.ts
export const PROFILE_DATA = {
  hero: {
    name: "Adithya P Navada",
    title: "Software Developer (SDE-1)",
    subtitle: "Full-stack development, scalable backend systems, automation & AI-driven workflows",
    avatar: "🚀"
  },

  sections: {
    overview: {
      icon: "🚀",
      title: "Professional Journey",
      color: "blue",
      content: {
        intro:
          "My journey in software development has been driven by curiosity, problem solving, and a passion for building systems that create measurable real-world impact. From academic projects in machine learning to developing enterprise SaaS platforms as an SDE-1, I have consistently focused on building scalable, maintainable, and production-ready solutions. I enjoy working across the stack, designing clean frontend experiences while architecting robust backend systems.",

        mission:
          "I specialize in building scalable full-stack applications, workflow automation systems, and AI-integrated platforms that enhance productivity, reduce manual operations, and deliver strong business value."
      }
    },

    experience: {
      icon: "💼",
      title: "Professional Experience",
      color: "green",
      roles: [
        {
          id: "current",
          position: "Software Developer (SDE-1)",
          company: "Defyd India Pvt Ltd",
          status: "Current",
          period: "June 2025 – Present",
          description:
            "Working on enterprise-grade SaaS platforms including real estate and automation systems. Contributing to scalable backend architecture, white-labeling systems, AI workflows, and WhatsApp-based booking platforms using modern full-stack technologies.",
          highlights: [
            "White Labeling Architecture",
            "Fastify Backend Systems",
            "Temporal & N8N Workflows",
            "AI Agents & WhatsApp Integrations",
            "PostgreSQL & Prisma Optimization"
          ]
        },
        {
          id: "previous",
          position: "Software Developer Intern (SDE-0)",
          company: "Defyd India Pvt Ltd",
          status: "Previous",
          period: "March 2025 – June 2025",
          description:
            "Developed full-stack features in Nx monorepo architecture using Next.js and Fastify. Built database-driven features, optimized queries, and worked with containerized deployments using Docker and BullMQ for background processing.",
          highlights: [
            "Nx Monorepo Development",
            "Next.js + TypeScript",
            "Fastify APIs",
            "Docker Deployment",
            "BullMQ Background Jobs"
          ]
        }
      ]
    },

    achievements: {
      icon: "🏆",
      title: "Key Achievements",
      color: "yellow",
      awards: [
        {
          id: "scholarship",
          title: "Academic Scholarship – PES University",
          type: "Merit Recognition",
          description:
            "Awarded scholarship for consistent academic excellence during MCA program.",
          icon: "🎓",
          impact: "Academic Excellence"
        },
        {
          id: "figmathon",
          title: "Figmathon Design Competition",
          type: "4th Place",
          description:
            "Secured 4th place in a competitive design challenge focused on UI/UX innovation.",
          icon: "🏅",
          impact: "Design & Innovation"
        }
      ]
    },

    expertise: {
      icon: "⚡",
      title: "Technical Expertise",
      color: "purple",
      domains: [
        {
          area: "Frontend Development",
          icon: "⚛️",
          color: "blue",
          skills: ["Next.js", "React", "TypeScript", "Responsive UI"],
          description:
            "Building modern, scalable, and user-focused web interfaces."
        },
        {
          area: "Backend & Architecture",
          icon: "⚙️",
          color: "green",
          skills: ["Node.js", "Fastify", "GraphQL", "REST APIs", "Prisma"],
          description:
            "Designing scalable backend services with clean architecture and optimized database access."
        },
        {
          area: "Automation & Workflows",
          icon: "🔄",
          color: "orange",
          skills: ["Temporal", "N8N", "BullMQ", "Background Processing"],
          description:
            "Developing workflow-driven systems for reliable automation and event processing."
        },
        {
          area: "AI & Intelligent Systems",
          icon: "🤖",
          color: "indigo",
          skills: ["AI Agents", "Machine Learning", "Data Processing", "System Integration"],
          description:
            "Integrating AI-driven logic into production systems for intelligent automation."
        }
      ]
    }
  }
} as const;