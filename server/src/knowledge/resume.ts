// The only facts the chat bot is allowed to rely on. Keep this in sync with the
// resume and portfolio: if something isn't written here, the bot is told to say
// it doesn't know rather than guess.
export const resumeKnowledge = `
NAME: Navya Anumula
ROLE: Full Stack Engineer (TypeScript end to end: Node.js, Next.js, React)
LOCATION: Based in Stockholm, Sweden. Full EU work authorization. Available immediately. Open to Frontend and Full-Stack roles.
CONTACT: navyaanumula@gmail.com | +46 72 774 4915 | linkedin.com/in/navya-anumula-frontend-engineer | github.com/navyaiscoding | portfolio: navya-anumula-portfolio.vercel.app

SUMMARY
Full Stack Engineer with close to 7 years of experience shipping TypeScript end to end: React and Next.js on the frontend, Node.js and TypeScript on the backend, including Backend for Frontend (BFF) layers. Experience spans third-party API integration, SSO and OAuth-based authentication, and async workflows in regulated, security-first environments, including a UAE mobile banking app serving hundreds of thousands of external users.

CORE COMPETENCIES
Full Stack application development and deployment; engineering best practices; product ownership and design analysis; architecture and technical decisions; async workflows and scalable, security-first system design; AI-assisted development; cross-functional collaboration and mentorship.

EXPERIENCE
1) Deloitte, Software Engineer, 11/2024 to 02/2026
Tech: Angular 19, React, Next.js, TypeScript, Node.js, GenAI, MCP, Cypress, Playwright
- Delivered two e-commerce applications from scratch in TypeScript end to end: React and Next.js frontend and a Node.js Backend for Frontend (BFF) layer aggregating downstream APIs.
- Delivered two consecutive Angular 19 releases for a US-based healthcare digital platform.
- Integrated the Figma MCP server into Cursor as an MCP connector to generate UI directly from designs using GenAI, alongside GitHub Copilot and Claude.
- Standardised the frontend and documentation for a micro frontend architecture, building a shared Storybook component library used across teams.
- Developed end-to-end features from business requirements through stakeholder communication, product design, deployment pipelines and APIs.
- Wrote end-to-end tests with Cypress and Playwright alongside unit and component testing.
- Took part in Agile sprint planning and retrospectives; mentored junior developers through pair programming, feedback and knowledge sharing, reducing defects towards release.

2) Infosys, Senior Frontend Developer, 07/2023 to 11/2024
Tech: React, TypeScript, GraphQL, .NET/C# REST APIs
- Led a team of 4-5 developers taking a business problem from idea to release with full ownership: migrated an existing platform to React.js and TypeScript and built a Service Request Platform with role-based, SSO-authenticated, asynchronous approval workflows.
- Architected and developed the platform's .NET/C# REST APIs in the initial phase (resource models and API contracts for service requests, approvals and role-based access).
- Built and versioned the API layer behind the approval workflows with request validation, consistent error handling and SSO-authenticated access, and documented the endpoints.
- Set up CI/CD pipelines with GitHub Actions to automate deployments.
- Improved test coverage and code quality with Jest, resolved production defects and led peer code reviews.

3) Infosys, Senior Systems Engineer, 05/2022 to 06/2023
Tech: React, TypeScript, .NET/C# REST APIs, SQL
- Owned and maintained two FinTech applications in React and TypeScript.
- Engineered .NET/C# REST APIs with JWT/OAuth-based authentication backed by large relational databases for account-type-based data retrieval.
- Designed and optimised data-retrieval endpoints (query shaping, pagination, response contracts) for the Account Opening and Stock Locate portals, covered by Jest tests.
- Built an Account Opening Portal for financial advisors, cutting account-opening turnaround time.
- Delivered a Stock Locate Portal to track stock price movements and perform trading operations.

4) Wipro, Project Engineer, 06/2019 to 04/2022
Tech: React, Redux, JavaScript, React Native, SAST, DAST, Nexus
- Delivered three consecutive releases of VISA Click to Pay in React, Redux and JavaScript for a UK-based banking service, integrating external payment APIs and async payment flows under strict security and compliance requirements.
- Built and maintained the wallet feature and banking workflows (Beneficiaries, Account Status, Loans, User Registration) in React Native and Redux for a UAE mobile banking app serving hundreds of thousands of external users, integrating with core banking services over REST APIs. Shipped on iOS and Android from one React Native codebase.
- Worked with SAST, DAST and Nexus scans as part of secure release practices for regulated banking releases.
- Resolved production defects by pairing with senior developers.

PROJECT
ReRitam (Lovable SheBuilds Season 4, October 2026): selected from around 3,300 applicants worldwide, with around 800 accepted into the hackathon, and built from scratch in under 72 hours. A mobile-first wellness companion for women, particularly those dealing with PMOS, built around small daily habits, gentle check-ins and notes, with streaks and points, gentle AI-generated suggestions and weekly reflections. Installable as a PWA with push reminders. Live: reritam-wellness.lovable.app. Tech: React 19, TypeScript, TanStack Start, Router and Query, Tailwind CSS v4, shadcn/ui, Lovable Cloud (PostgreSQL with row-level security), Lovable AI Gateway.
This portfolio itself: React, Vite and TypeScript frontend with a Node.js/Express API (contact form, competencies, visitor stats and likes backed by Upstash Redis), deployed on Vercel.

CERTIFICATIONS
- Claude Code in Action, Claude Academy, October 2026
- Vibe Coding with Lovable: From Idea to Prototype in Under an Hour, LinkedIn Learning, October 2026

TECHNICAL SKILLS
Frontend: React, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Storybook, Server-Side Rendering.
Backend and APIs: Node.js, TypeScript, .NET/C#, REST APIs, GraphQL, SQL, PostgreSQL, API design and third-party integration.
Auth and integrations: SSO, OAuth 2.0, JWT, token-based authentication, external payment API integration (VISA), async workflows.
Architecture: Backend for Frontend (BFF), micro frontend architecture, reusable component libraries, scalable and maintainable system design, security and compliance requirements.
Testing and quality: Jest, React Testing Library, Cypress, Playwright, SonarQube, SAST, DAST, Nexus scan, test automation, peer code reviews.
Cloud and DevOps: Vercel, GitHub, GitHub Actions, Azure DevOps, CI/CD, Git, Jenkins, Webpack, Vite.
AI-augmented development: MCP connectors, Cursor, GitHub Copilot, Claude, Codex, Lovable, GenAI-driven UI generation, prompt engineering.
Ways of working: Agile, product and design discussions, pair programming, mentoring, clear communication, developer-friendly documentation.

EDUCATION
Bachelor of Technology in Electronics and Communications, Sreyas Institute of Engineering and Technology, Hyderabad, India, 2015 to 2019.

LANGUAGES
English.

NOT IN THE RESUME (do not claim): Java, Spring Boot, infrastructure-as-code, Vitest, WebSockets. Backend APIs at Infosys were .NET/C#; Node.js backend work is from Deloitte (BFF) and this portfolio.
`.trim()
