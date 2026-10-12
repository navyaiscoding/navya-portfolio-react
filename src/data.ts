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
}

export interface NavSearchItem {
  id: string
  label: string
  group: string
  keywords: string
}

export interface ProjectEntry {
  name: string
  description: string
  stack: string[]
  liveUrl?: string
  repoUrl?: string
}

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
  title: 'Full Stack Developer — React, Angular, TypeScript & Node.js',
  location: 'Stockholm, Sweden',
  availability: 'Full EU Work Authorization · Available Immediately',
  email: 'navyaanumula@gmail.com',
  phone: '+46 72 774 4915',
  linkedin: 'https://www.linkedin.com/in/navya-anumula-frontend-engineer/',
  linkedinUrl: 'https://www.linkedin.com/in/navya-anumula-frontend-engineer/',
  summary:
    'Full Stack Developer with 7 years of experience building production web and mobile applications in React, Angular, TypeScript, and React Native across banking, financial services, healthcare, and e-commerce. Skilled in frontend architecture, performance and SEO optimization, and REST API integration, with a track record of defining frontend development standards, mentoring engineers, and leading Agile delivery from sprint planning through retrospectives.',
  bio: [
    "Give me a codebase I've never seen, a language I haven't touched, or a problem nobody's solved yet, and my first move is never to ask for a ramp-up plan. It's to always start reading, start testing, and start building.", 
      "For close to 7 years, that instinct is what's mattered more than any single tool: picking up whatever a project actually needed, usually within days, and shipping something real rather than waiting to be fully comfortable first. I have set frontend architecture on complex platforms, led teams to take business problems from idea to release with full ownership, mentored junior engineers through code review, and treat Gen AI- assisted development as a daily part of the workflow rather than a novelty.",
    "Coding keeps me busy, but outside the world of programming I like to keep myself occupied with reading, cooking and spending ample time in the nature.",
  ],
}

export const skills: SkillGroup[] = [
  {
    category: 'Frontend',
    items: ['React', 'Angular', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'React Native', 'HTML5', 'CSS3', 'SCSS', 'Tailwind CSS', 'Storybook'],
  },
  {
    category: 'State Management & Architecture',
    items: ['Redux', 'Redux Saga', 'RxJs', 'React Context', 'Custom Hooks', 'Server-Side Rendering (SSR)'],
  },
  {
    category: 'Testing & Quality',
    items: ['Jest', 'React Testing Library', 'Postman'],
  },
  {
    category: 'DevOps & Tooling',
    items: ['Git', 'GitHub','Jenkins', 'Webpack', 'Vite', 'Figma'],
  },
  {
    category: 'Backend & APIs',
    items: ['Node.js', 'GraphQL', 'PostgreSQL'],
  },
  {
    category: 'AI-Assisted Development',
    items: ['GitHub Copilot', 'Cursor', 'Claude'],
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
  { id: 'projects', label: 'Projects', group: 'Sections', keywords: 'projects side projects work portfolio' },
  { id: 'experience', label: 'Experience', group: 'Sections', keywords: 'experience work history jobs' },
  { id: 'contact', label: 'Contact', group: 'Sections', keywords: 'contact email message reach out' },
]

export const projects: ProjectEntry[] = [
  {
    name: 'Celluloid Verdict',
    description: 'A movie review platform — unsparing, unspooled critiques with ratings and genre tagging for films worth arguing about.',
    stack: ['Built with Lovable'],
    liveUrl: 'https://celluloid-verdict.lovable.app/',
  },
]

export const experience: ExperienceEntry[] = [
  {
    role: 'Software Engineer',
    company: 'Deloitte',
    stack: 'React, Angular, Next.js, TypeScript, GenAI',
    period: '11/2024 – 02/2026',
    bullets: [
        "Delivered two e-commerce applications built on React, Next.js and TypeScript on the frontend and Node.js on the backend, from scratch, promoting coding standards and engineering best practices.",
        "Standardised the frontend and documentation for a monorepo architecture, building a shared library for reusable UI components using Storybook, used across teams.",
        "Developed end-to-end features analysing business requirements through stakeholder communication, product design, setting up automated pipelines for deployment, and building APIs.",
        "Actively participated in Agile sprint planning and retrospectives to ensure proper estimation and assignment of stories, as well as work on stakeholder feedback.",
        "Ensured interface accessibility in accordance with WCAG standards, implementing ARIA labeling and conducting screen-reader testing.",
        "Integrated the Figma MCP server into Cursor to generate UI directly from designs using GenAI, speeding up implementation.",
      ],
  },
  {
    role: 'Senior Frontend Developer',
    company: 'Infosys',
    stack: 'React, TypeScript, Node.js, GraphQL',
    period: '07/2023 – 11/2024',
    bullets: [
      "Migrated a legacy platform to React.js and TypeScript, leading a team of developers from ground-up to release through evolving requirements.",
        "Architected and developed the Node.js APIs in the initial phase of app development, contributing to technical decisions to keep the system maintainable and scalable as it grew.",
        "Integrated frontend applications with REST & GraphQL APIs alongside backend services.",
        "Mentored junior developers through pair programming and feedback, reducing defects towards the release.",
        "Set up CI/CD pipelines using GitHub to automate deployments, cutting down manual release effort.",
        "Improved test coverage and resolved production defects, leading peer code reviews and mentoring engineers along the way by promoting coding standards and engineering best practices",
      ],
  },
  {
    role: 'Senior Systems Engineer',
    company: 'Infosys',
    stack: 'React, TypeScript, Node.js',
    period: '05/2022 – 06/2023',
    bullets: [
      "Owned two applications in the FinTech domain in React and TypeScript, lifting user engagement and reliability.",
      "Developed an Account Opening Portal for financial advisors, to cut down the turn-around time for opening demat accounts.",
      "Delivered a Stock Locate Portal to help users keep track of rise and fall of stock prices, and perform trading operations.",
      "Collaborated with backend developers in the development of services for smoother integration on the frontend",
    ],
  },
  {
    role: 'Project Engineer',
    company: 'Wipro',
    stack: 'React, JavaScript, React Native',
    period: '06/2019 – 04/2022',
    bullets: [
      "Delivered three successful consecutive releases of VISA Click to Pay in React and JavaScript for a UK-based banking service, shipping a faster and seamless payment experience.",
      "Developed the wallet feature and workflows such as Beneficiaries, Account Status, and Loans using React Native and JavaScript for a UAE mobile banking app used by hundreds of thousands of real customers.",
      "Resolved defects by teaming up with senior developers to analyse and debug the code.",
    ],
  },  
]
