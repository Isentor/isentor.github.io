export const externalLinks = {
  github: 'https://github.com/Isentor',
  linkedin: 'https://www.linkedin.com/in/maurycy-pytel-032b2a107/',
  email: 'maurycy.pytel@gmail.com',
  emailHref: 'mailto:maurycy.pytel@gmail.com',
} as const;

export interface Project {
  name: string;
  category: string;
  description: string;
  details?: string;
  technologies: string[];
  visualType: 'web' | 'architecture' | 'automation';
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  liveUrl?: string;
  liveLabel?: string;
  caseStudyUrl?: string;
  caseStudyLabel?: string;
}

export const projects: Project[] = [
  {
    name: 'Tawerna Gothic',
    category: 'WEB PLATFORM',
    description:
      'A long-running gaming platform combining a custom WordPress website with human-led editorial workflows and AI-assisted orchestration.',
    details:
      'I own the product direction and information architecture, develop the platform and coordinate research, content and QA. A WordPress publishing API is committed (October 2026) and not yet deployed; final regression verification and a security review remain.',
    technologies: ['WordPress', 'PHP', 'Python', 'Workflow Orchestration'],
    visualType: 'web',
    image: '/projects/tawerna-gothic/homepage-desktop.webp',
    imageAlt: 'Screenshot of the Tawerna Gothic homepage',
    imageWidth: 1440,
    imageHeight: 900,
    liveUrl: 'https://tawerna-gothic.pl',
    liveLabel: 'Visit live site',
    caseStudyUrl: '/projects/tawerna-gothic/',
    caseStudyLabel: 'View case study',
  },
  {
    name: 'Grytycy.pl',
    category: 'WEB ARCHITECTURE',
    description:
      'A staged WordPress rebuild with a custom article model, validated content migration, legacy URL normalization and a responsive child theme.',
    details:
      'The frontend foundation is deployed and verified. A new editorial homepage is a locally verified release candidate, not yet deployed.',
    technologies: ['WordPress', 'PHP', 'Content Modelling', 'Migration Validation'],
    visualType: 'architecture',
    caseStudyUrl: '/projects/grytycy/',
    caseStudyLabel: 'View case study',
  },
  {
    name: 'Content Publishing Automation',
    category: 'SOFTWARE & AUTOMATION',
    description:
      'A modular Python publishing application with transactional SQLite state, validated content packages and a Meta Graph API adapter.',
    details:
      'Implemented recovery and reconciliation workflows handle interrupted operations and uncertain external results. Unrestricted production operation is not claimed; credential management remains in development.',
    technologies: ['Python', 'SQLite', 'REST APIs', 'Recovery', 'Contract Testing'],
    visualType: 'automation',
    caseStudyUrl: '/projects/content-publishing-automation/',
    caseStudyLabel: 'View case study',
  },
];

export interface ExpertiseArea {
  title: string;
  summary: string;
  skills: string[];
}

export const expertiseAreas: ExpertiseArea[] = [
  {
    title: 'Software & Automation',
    summary: 'Publishing tools and human-led workflows with explicit state, integrity checks and recovery paths.',
    skills: ['Python applications', 'Workflow orchestration', 'SQLite transactions', 'REST APIs', 'Scheduling', 'Data integrity', 'Recovery workflows', 'Integration and contract testing', 'PowerShell tooling', 'Idempotent operations'],
  },
  {
    title: 'Web Development',
    summary: 'Custom content platforms, controlled migrations and responsive interfaces built for long-term maintenance.',
    skills: ['PHP', 'WordPress plugin and REST API development', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'WordPress', 'WooCommerce', 'Content modelling', 'Migration validation', 'Technical SEO', 'Accessibility verification (axe)', 'Security hardening'],
  },
  {
    title: 'Data & Analytics',
    summary: 'Operational data turned into useful reporting, search insights and better decisions.',
    skills: ['SQL', 'Data analysis', 'Business and operational data', 'Google Analytics', 'Google Search Console', 'Reporting'],
  },
  {
    title: 'Digital & E-commerce',
    summary: 'Hands-on work across stores, acquisition, content operations and product structure.',
    skills: ['Shopify', 'WooCommerce', 'E-commerce operations', 'SEO', 'Digital campaigns', 'Content management'],
  },
];

export interface ExperienceItem {
  period: string;
  title: string;
  description: string;
}

export const experienceItems: ExperienceItem[] = [
  {
    period: '2002 - Present',
    title: 'Websites & Digital Projects',
    description: 'Long-term hands-on experience managing websites, blogs, CMS platforms and digital content.',
  },
  {
    period: '2017 - Present',
    title: 'Omnichannel & Data-driven Operations',
    description: 'Professional experience working with sales, inventory, profitability, reporting and operational process improvement.',
  },
  {
    period: '2019 - 2025',
    title: 'E-commerce Business',
    description: 'Built and operated a Shopify store covering product structure, pricing, promotions, fulfillment, SEO, analytics and digital acquisition.',
  },
  {
    period: 'Current Focus',
    title: 'Web Development & Automation',
    description: 'Developing custom WordPress platforms, reliable Python publishing tools and human-led AI workflows, with requirements, implementation review and evidence-based acceptance.',
  },
];
