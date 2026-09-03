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
}

export const projects: Project[] = [
  {
    name: 'Tawerna Gothic',
    category: 'WEB PLATFORM',
    description:
      'A content-driven gaming platform developed and maintained on WordPress, combining publishing workflows, information architecture and ongoing technical development.',
    technologies: ['WordPress', 'PHP', 'MySQL', 'Content Architecture'],
    visualType: 'web',
  },
  {
    name: 'Grytycy.pl',
    category: 'WEB ARCHITECTURE',
    description:
      'A gaming website undergoing a broader technical and information architecture rebuild, with a focus on scalable content structure and long-term maintainability.',
    technologies: ['WordPress', 'PHP', 'MySQL', 'Information Architecture'],
    visualType: 'architecture',
  },
  {
    name: 'Content Publishing Automation',
    category: 'SOFTWARE & AUTOMATION',
    description:
      'A Python-based system designed to automate the preparation, selection and scheduling of content for social media platforms.',
    details:
      'The system includes persistent storage, configurable publishing rules, scheduling logic, fallback strategies, validation and safeguards designed to prevent invalid publishing operations.',
    technologies: ['Python', 'SQLite', 'APIs', 'Scheduling', 'Testing'],
    visualType: 'automation',
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
    summary: 'Practical systems designed around repeatable workflows, clear rules and reliable safeguards.',
    skills: ['Python applications', 'Workflow automation', 'SQLite', 'REST APIs', 'Scheduling', 'Validation', 'Testing'],
  },
  {
    title: 'Web Development',
    summary: 'Content-driven websites built for maintainability, publishing needs and long-term growth.',
    skills: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'WordPress', 'WooCommerce', 'Website architecture'],
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
    description: 'Building production websites, Python tools and automation systems designed around real workflows and practical problems.',
  },
];
