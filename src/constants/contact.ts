// src/constants/contact.ts
export const CONTACT_METHODS = {
  email: {
    title: 'Email',
    icon: '📧',
    color: 'blue',
    value: 'adithya1629@gmail.com',
    link: 'mailto:adithya1629@gmail.com',
    description: 'Drop me a line anytime',
    bgPattern: '📧📮✉️'
  },
  phone: {
    title: 'Phone',
    icon: '📞',
    color: 'green',
    value: '+91 9740239479',
    link: 'tel:+919740239479',
    description: 'Call for instant connect',
    bgPattern: '📞☎️📱'
  },
  github: {
    title: 'GitHub',
    icon: '💻',
    color: 'purple',
    value: 'github.com/AdithyaNavada',
    link: 'https://github.com/AdithyaNavada',
    description: 'Check out my code',
    bgPattern: '💻⚡🚀'
  },
  linkedin: {
    title: 'LinkedIn',
    icon: '💼',
    color: 'indigo',
    value: 'linkedin.com/in/adithya-p-navada-56b464301',
    link: 'https://www.linkedin.com/in/adithya-p-navada-56b464301/',
    description: 'Let\'s connect professionally',
    bgPattern: '💼🤝🌟'
  }
} as const;
