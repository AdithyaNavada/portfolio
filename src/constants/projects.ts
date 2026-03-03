// src/constants/projects.ts
export const PROJECTS = {
  ids: {
    id: 'ids',
    title: 'AI-Driven Intrusion Detection System',
    subtitle: 'Machine Learning Based Network Security',
    category: 'ai',
    icon: '🛡️',
    color: 'blue',
    tagline: 'Detecting network threats using ML & simulated environments',
    technologies: ['Python', 'GNS3', 'Wireshark', 'scikit-learn', 'Docker'],
    description:
      'A machine learning-based intrusion detection system deployed inside a simulated real-world network environment.',
    features: [
      {
        title: 'ML-Based Threat Detection',
        description:
          'Trained Random Forest model on network traffic achieving 91% accuracy',
        icon: '🤖',
        impact: '91% Detection Accuracy'
      },
      {
        title: 'Network Simulation',
        description:
          'Designed custom network topologies in GNS3 for realistic traffic simulation',
        icon: '🌐',
        impact: 'Real-world testing'
      },
      {
        title: 'Packet Analysis',
        description:
          'Captured and analyzed live packets using Wireshark for dataset generation',
        icon: '📡',
        impact: 'Accurate data capture'
      },
      {
        title: 'Containerized Deployment',
        description:
          'Deployed the ML model inside Docker for modular and scalable testing',
        icon: '🐳',
        impact: 'Portable & scalable'
      }
    ]
  },

  chatify: {
    id: 'chatify',
    title: 'Chatify',
    subtitle: 'Real-Time Chat Application',
    category: 'fullstack',
    icon: '💬',
    color: 'green',
    tagline: 'Scalable real-time messaging with room-based architecture',
    technologies: ['Node.js', 'Socket.IO', 'JavaScript', 'HTML', 'CSS'],
    description:
      'A scalable real-time chat platform supporting multiple rooms and instant bidirectional communication.',
    features: [
      {
        title: 'Real-Time Messaging',
        description:
          'Implemented WebSocket-based real-time communication using Socket.IO',
        icon: '⚡',
        impact: 'Instant message delivery'
      },
      {
        title: 'Room-Based Architecture',
        description:
          'Designed room-based messaging system supporting multiple concurrent chat sessions',
        icon: '🏠',
        impact: 'Scalable conversations'
      },
      {
        title: 'User Join/Leave Notifications',
        description:
          'Built dynamic user presence and activity notifications',
        icon: '🔔',
        impact: 'Improved user experience'
      },
      {
        title: 'Responsive UI',
        description:
          'Designed responsive interface compatible across devices',
        icon: '📱',
        impact: 'Cross-device support'
      }
    ]
  },

  salesPrediction: {
    id: 'salesPrediction',
    title: 'Sales Prediction Model',
    subtitle: 'ML-Powered Price Forecasting',
    category: 'ai',
    icon: '📊',
    color: 'purple',
    tagline: 'Predicting real estate prices using machine learning',
    technologies: ['Python', 'Flask', 'scikit-learn', 'Pandas', 'HTML/CSS'],
    description:
      'A machine learning-powered web application that predicts real estate prices based on input features.',
    features: [
      {
        title: 'Regression Model Training',
        description:
          'Trained ML regression models for accurate property price forecasting',
        icon: '📈',
        impact: 'Data-driven predictions'
      },
      {
        title: 'Flask Web Integration',
        description:
          'Integrated trained model into Flask backend for real-time predictions',
        icon: '🌍',
        impact: 'Live web predictions'
      },
      {
        title: 'Automated Data Processing',
        description:
          'Implemented preprocessing pipelines for feature normalization and encoding',
        icon: '⚙️',
        impact: 'Improved model accuracy'
      },
      {
        title: 'User-Friendly Interface',
        description:
          'Built clean UI for user input and instant prediction results',
        icon: '🖥️',
        impact: 'Easy interaction'
      }
    ]
  }
} as const;