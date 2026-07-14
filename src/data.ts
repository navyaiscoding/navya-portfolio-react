export interface Profile {
  name: string
  title: string
  location: string
  availability: string
  email: string
  phone: string
  linkedin: string
  linkedinUrl: string
  summary: string
  bio: string[]
}

export interface SkillGroup {
  category: string
  items: string[]
  level: number
}

export interface NavSearchItem {
  id: string
  label: string
  group: string
  keywords: string
}

export const contactFormEndpoint = ''

export interface ExperienceEntry {
  role: string
  company: string
  stack: string
  period: string
  bullets: string[]
}

export const roles: string[] = [
  'React Developer',
  'Angular Developer',
  'TypeScript Engineer',
  'Frontend Architect',
  'Web Developer',
  'Mobile Developer',
]

export const profile: Profile = {
  name: 'Navya Anumula',
  title: 'Senior Software Engineer — React, Angular, TypeScript & Node.js',
  location: 'Stockholm, Sweden',
  availability: 'Full EU Work Authorization · Available Immediately',
  email: 'navyaanumula@gmail.com',
  phone: '+46 72 774 4915',
  linkedin: 'https://www.linkedin.com/in/navya-anumula-frontend-engineer/',
  linkedinUrl: 'https://www.linkedin.com/in/navya-anumula-frontend-engineer/',
  summary:
    'Senior Frontend Engineer with 7 years of experience building production web and mobile applications in React, Angular, TypeScript, and React Native across banking, financial services, healthcare, and e-commerce. Skilled in frontend architecture, performance and SEO optimization, and REST API integration, with a track record of defining frontend development standards, mentoring engineers, and leading Agile delivery from sprint planning through retrospectives.',
  bio: [
    "I'm a frontend engineer who likes making complex systems feel simple to use. Over the past 7 years I've built and scaled production applications across banking, healthcare, and e-commerce — mostly in React, Angular, and TypeScript, with a stint in React Native for mobile banking. I care as much about how a codebase feels to work in as how the product feels to use, which is why I spend a lot of time on architecture, performance, and the small decisions that help a team move faster.",
    "Lately I've been leaning into AI-assisted development, pairing tools like Copilot and Cursor with solid engineering fundamentals rather than treating them as a shortcut. I'm based in Stockholm with full EU work authorization, and open to senior frontend and full-stack roles.",
  ],
}

export const skills: SkillGroup[] = [
  {
    category: 'Frontend',
    items: ['React', 'Angular', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'React Native', 'HTML5', 'CSS3', 'SCSS', 'Tailwind CSS', 'Storybook'],
    level: 95,
  },
  {
    category: 'State Management & Architecture',
    items: ['Redux', 'Redux Saga', 'RxJs', 'React Context', 'Custom Hooks', 'Server-Side Rendering (SSR)'],
    level: 88,
  },
  {
    category: 'Testing & Quality',
    items: ['Jest', 'Enzyme', 'React Testing Library', 'Postman', 'Accessibility (WCAG)', 'SEO', 'SonarQube'],
    level: 90,
  },
  {
    category: 'DevOps & Tooling',
    items: ['Git', 'GitHub', 'Azure DevOps', 'CI/CD Pipelines', 'Jenkins', 'Webpack', 'Vite', 'Figma'],
    level: 80,
  },
  {
    category: 'Backend & APIs',
    items: ['Node.js', 'GraphQL', 'REST APIs', 'SQL', 'PostgreSQL', 'JWT', 'OAuth'],
    level: 70,
  },
  {
    category: 'AI-Assisted Development',
    items: ['GitHub Copilot', 'Cursor', 'Claude', 'LangGraph'],
    level: 90,
  },
]

export const coreCompetencies: string[] = [
  'Frontend Architecture & Design Systems',
  'Performance & SEO Optimization',
  'API Design & CMS Integration',
  'Accessibility (WCAG) & UX Quality',
  'Figma & Designer Collaboration',
  'Technical Leadership & Mentoring',
  'Stakeholder Engagement & Release Management',
  'GenAI-Assisted Development',
]

export const navSearchItems: NavSearchItem[] = [
  { id: 'top', label: 'Home', group: 'Sections', keywords: 'home top hero start' },
  { id: 'about', label: 'About', group: 'Sections', keywords: 'about summary bio' },
  { id: 'competencies', label: 'Core Competencies', group: 'Sections', keywords: 'competencies strengths capabilities' },
  { id: 'skills', label: 'Skills', group: 'Sections', keywords: 'skills tech stack' },
  { id: 'experience', label: 'Experience', group: 'Sections', keywords: 'experience work history jobs' },
  { id: 'contact', label: 'Contact', group: 'Sections', keywords: 'contact email message reach out' },
]

export const experience: ExperienceEntry[] = [
  {
    role: 'Consultant',
    company: 'Deloitte',
    stack: 'Angular, Next.js, TypeScript, GenAI',
    period: '11/2024 – 02/2026',
    bullets: [
      'Established scalable frontend architecture and engineering standards for a complex e-commerce platform, by documenting frontend development standards and building a shared Storybook component library.',
      'Improved page speed and search visibility for a licensing e-commerce platform by implementing Server-Side Rendering (SSR) with Next.js and TypeScript.',
      'Delivered two consecutive Angular releases for a US-based healthcare digital platform.',
      'Increased design-to-development speed by integrating Figma MCP and Cursor AI into the codebase to generate responsive UI directly from designs.',
      'Maintained 88% test coverage and strengthened release confidence via Jest/React Testing Library, leading code reviews and mentoring during sprint planning, stand-ups, and retrospectives.',
    ],
  },
  {
    role: 'Technology Analyst',
    company: 'Infosys',
    stack: 'React, TypeScript, GraphQL',
    period: '07/2023 – 11/2024',
    bullets: [
      'Designed and developed a React.js/TypeScript Service Request Platform with role-based approval workflows.',
      'Engineered .NET and GraphQL API integration patterns for seamless frontend-backend collaboration.',
      'Conducted technical interviews for frontend developer roles, strengthening the hiring pipeline.',
      'Mentored junior developers through code reviews and technical guidance during daily stand-ups.',
    ],
  },
  {
    role: 'Senior Systems Engineer',
    company: 'Infosys',
    stack: 'React, TypeScript, Node.js',
    period: '05/2022 – 06/2023',
    bullets: [
      'Modernized a 10-year-old legacy stock-locate platform via migration to React, increasing user engagement by 60% with fewer than 10 production defects at launch.',
      'Architected and delivered a React/TypeScript Account Opening Portal that digitized advisor onboarding workflows.',
      'Engineered Node.js REST APIs for account-type-based dynamic form data retrieval.',
      'Coordinated delivery across a 5-member engineering team through sprint planning and retrospectives.',
    ],
  },
  {
    role: 'Project Engineer',
    company: 'Wipro',
    stack: 'React, JavaScript, React Native',
    period: '06/2019 – 04/2022',
    bullets: [
      'Engineered and maintained React Native modules for a digital wallet feature in a high-volume UAE-based mobile banking app.',
      "Delivered the Virtual Card feature for a UK-based bank, integrating with the Card Management team.",
      'Resolved production issues in close collaboration with backend engineers for stable, high-volume banking releases.',
    ],
  },
]
