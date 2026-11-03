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

export interface CertificationEntry {
  name: string
  issuer: string
  issued: string
  credentialUrl?: string
  // Logo shown in the card's badge; falls back to a generic ribbon if omitted or it fails to load.
  iconUrl?: string
}

export interface ExperienceRole {
  role: string
  period: string
  // Short key facts shown as chips above the description
  highlights: string[]
  // Tech tiles (labels must match skillIcons.ts; unknown ones show initials)
  stack: string[]
  paragraphs: string[]
}

// One employer. Several roles at the same company (e.g. a promotion) live in
// `roles`, newest first, and render as a mini timeline under that company's step.
export interface ExperienceEntry {
  company: string
  roles: ExperienceRole[]
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
    items: ['Node.js', '.NET', 'GraphQL', 'PostgreSQL'],
  },
  {
    category: 'AI-Assisted Development',
    items: ['GitHub Copilot', 'Cursor', 'Claude', 'Codex', 'Lovable'],
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
  { id: 'certifications', label: 'Certifications', group: 'Sections', keywords: 'certifications certificates badges courses credentials' },
  { id: 'contact', label: 'Contact', group: 'Sections', keywords: 'contact email message reach out' },
]

export const projects: ProjectEntry[] = [
  {
    name: 'ReRitam',
    description: 'A gentle wellness companion for building daily rhythm — set your own reminders, track habits, and get a weekly AI insight. Built and shipped in under 72 hours for Lovable SheBuilds Season 04, where around 800 of roughly 3,300 applicants were accepted, and shaped by a survey of women.',
    stack: ['Lovable SheBuilds S04', 'Built with Lovable'],
    liveUrl: 'https://reritam-wellness.lovable.app/',
  },
]

export const certifications: CertificationEntry[] = [
  {
    name: 'Claude Code in action',
    issuer: 'Claude Academy · Anthropic',
    issued: 'October 2026',
    credentialUrl: 'https://academy.claude.com/verify/db1b7cbd8fce8c4422f6b13aa7f0a132',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/claude-color.svg',
  },
  {
    name: 'Vibe Coding with Lovable: From Idea to Prototype in Under an Hour',
    issuer: 'LinkedIn Learning',
    issued: 'October 2026',
    credentialUrl: 'https://www.linkedin.com/learning/certificates/3635ee69388cde195c04fe55948750efe99f987be923aa697eee5c0fa1f64c12',
    iconUrl: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/lovable-color.svg',
  },
]

export const experience: ExperienceEntry[] = [
  {
    company: 'Deloitte',
    roles: [
      {
        role: 'Software Engineer',
        period: '11/2024 – 02/2026',
        highlights: ['GenAI', 'BFF architecture', 'MCP servers', 'LangGraph agents', 'Claude Code workflows'],
        stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'MCP', 'LangGraph', 'Claude Code', 'GenAI', 'Adobe Analytics', 'Tag Analytics'],
        paragraphs: [
          "I architected and delivered a scalable e-commerce platform using a Backend-for-Frontend (BFF) architecture with Next.js and React, decoupling frontend clients from core microservices through a high-performance TypeScript API layer. In the Node.js layer I engineered API orchestration, service abstractions and data-transformation middleware, aggregating disparate backend services into optimized, frontend-ready payloads.",
          "On the AI side, I designed and deployed Model Context Protocol (MCP) servers within the BFF, securely exposing e-commerce catalogs, order management tools and database schemas to GenAI foundation models and internal developer tools. I also architected stateful, multi-agent conversational graphs with LangGraph to handle multi-turn order tracking, returns and exchange workflows.",
          "To keep delivery consistent, I built a CI/CD-integrated workflow that uses Claude Code to package, commit and open structured pull requests for routine microservice updates, and set up a repository governance layer with CLAUDE.md and REVIEW.md defining architecture patterns, strict type-safety rules and API-routing schemas for automated AI code reviews. That documentation kept autonomous tools and human developers aligned on consistent, low-debt coding standards.",
        ],
      },
    ],
  },
  {
    company: 'Infosys',
    roles: [
      {
        role: 'Senior Frontend Developer',
        period: '07/2023 – 11/2024',
        highlights: ['Team Lead', 'Service Request Platform', 'SSO approval workflows', '.NET/C# REST APIs'],
        stack: ['React', 'TypeScript', 'GraphQL', '.NET', 'C#', 'REST APIs'],
        paragraphs: [
          "I led a team of 4-5 developers to take a business problem from idea to release with full ownership, migrating an existing platform to React.js and TypeScript and building a Service Request Platform with role-based, SSO-authenticated, asynchronous approval workflows.",
          "In the initial phase I architected and developed the platform's .NET/C# REST APIs, designing resource models and API contracts for service requests, approvals and role-based access, and building and versioning the API layer behind the approval workflows with request validation, consistent error handling and SSO-authenticated access. I documented the endpoints so frontend and backend developers could integrate independently, set up CI/CD pipelines with GitHub Actions to automate deployments, and improved test coverage and code quality with Jest while resolving production defects and leading peer code reviews.",
        ],
      },
      {
        role: 'Senior Systems Engineer',
        period: '05/2022 – 06/2023',
        highlights: ['Production Delivery', 'Account Opening Portal', 'Stock Locate Portal', 'API and System Design'],
        stack: ['React', 'TypeScript', '.NET', 'C#', 'REST APIs', 'SQL'],
        paragraphs: [
          "I owned and maintained two FinTech applications in React and TypeScript, lifting user engagement and reliability. I built an Account Opening Portal for financial advisors that cut account-opening turnaround time for external users, and delivered a Stock Locate Portal for tracking the rise and fall of stock prices and performing trading operations.",
          "On the backend I built .NET/C# REST APIs with JWT/OAuth-based authentication, backed by large relational databases for account-type-based data retrieval. I designed and optimised the data-retrieval endpoints for both portals (query shaping, pagination and response contracts) and covered them with Jest tests ahead of release, keeping frontend-backend integration clean as the system scaled.",
        ],
      },
    ],
  },
  {
    company: 'Wipro',
    roles: [
      {
        role: 'Project Engineer',
        period: '06/2019 – 04/2022',
        highlights: ['3 consecutive releases', 'VISA Click to Pay', 'UAE mobile banking app', 'User Experience'],
        stack: ['React', 'Redux', 'JavaScript', 'React Native', 'Adobe Analytics', 'Tag Analytics', 'SAST', 'DAST', 'Nexus'],
        paragraphs: [
          "I delivered three consecutive releases of VISA Click to Pay in React, Redux and JavaScript for a UK-based banking service, integrating external payment APIs and async payment flows under strict security and compliance requirements and shipping a faster, seamless checkout experience to external users.",
          "I also built and maintained the wallet feature and banking workflows (Beneficiaries, Account Status, Loans and User Registration) in React Native and Redux for a UAE mobile banking app serving hundreds of thousands of external users, integrating with core banking services over REST APIs. I worked with SAST, DAST and Nexus scans as part of secure release practices for regulated banking releases, and resolved production defects by pairing with senior developers across the frontend and API integration layers.",
        ],
      },
    ],
  },
]
