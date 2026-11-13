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
      'A gaming platform I started in 2005, now running on a custom WordPress site with an interactive map and a browser-based lockpicking tool.',
    details:
      'I own the product direction and information architecture. Recent work includes verifying live article updates and testing the data and browser behavior behind two public tools.',
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
      'The editorial homepage, search, hubs and article templates are live. The rollout included route checks and a separate release for search and social metadata.',
    technologies: ['WordPress', 'PHP', 'Content Modelling', 'Migration Validation'],
    visualType: 'architecture',
    liveUrl: 'https://grytycy.pl/',
    liveLabel: 'Visit live site',
    caseStudyUrl: '/projects/grytycy/',
    caseStudyLabel: 'View case study',
  },
  {
    name: 'Content Publishing Automation',
    category: 'SOFTWARE & AUTOMATION',
    description:
      'A modular Python publishing application with transactional SQLite state, validated content packages and a Meta Graph API adapter.',
    details:
      'The workflow records intent before an API request and checks what happened before any retry. One controlled test confirmed public delivery. Routine production use remains blocked.',
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
    summary: 'Python tools that validate publishing packages, persist intent and reconcile incomplete operations against API readback.',
    skills: ['Python applications', 'Workflow orchestration', 'SQLite transactions', 'REST APIs', 'Scheduling', 'Data integrity', 'Recovery workflows', 'Integration and contract testing'],
  },
  {
    title: 'Web Development',
    summary: 'Custom WordPress platforms and content models, including controlled migrations and responsive interfaces checked in the browser.',
    skills: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'WordPress', 'WooCommerce', 'Content modelling', 'Migration validation', 'Technical SEO', 'Accessibility verification'],
  },
  {
    title: 'Data & Analytics',
    summary: 'Sales, inventory, profitability and search data used to support reporting and operational decisions.',
    skills: ['SQL', 'Data analysis', 'Business and operational data', 'Google Analytics', 'Google Search Console', 'Reporting'],
  },
  {
    title: 'Digital & E-commerce',
    summary: 'Hands-on experience running an online store and maintaining content platforms, from product structure and acquisition to everyday operations.',
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
    description: 'Releasing WordPress changes in stages, verifying browser tools and improving how publishing integrations handle incomplete responses.',
  },
];
