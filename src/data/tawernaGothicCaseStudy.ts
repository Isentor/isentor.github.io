export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface TimelineEntry {
  period: string;
  title: string;
  description: string;
}

export interface Challenge {
  title: string;
  problem: string;
  approach: string;
  result: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  mobile?: boolean;
}

export const caseStudySeo = {
  title: 'Tawerna Gothic Case Study | Maurycy Pytel',
  description:
    'Case study of Tawerna Gothic, a long-running gaming platform rebuilt on WordPress with custom information architecture, migration validation and an AI-assisted development workflow.',
  canonical: 'https://isentor.github.io/projects/tawerna-gothic/',
} as const;

export const hero = {
  label: 'WEB PLATFORM / CASE STUDY',
  title: 'Tawerna Gothic',
  headline: 'From a hand-coded fan site to a modern content platform.',
  lead:
    'Tawerna Gothic is a long-running Polish gaming platform focused on the Gothic series. I originally created the website in 2005 as a hand-coded HTML fan project. Over the years it evolved through several generations of content management systems before being rebuilt as a modern WordPress platform around the release of Gothic Remake.',
  metadata: [
    { label: 'Role', value: 'Creator, Technical Owner & Product Lead' },
    { label: 'Stack', value: 'WordPress · PHP · MySQL · JavaScript · CSS · WordPress REST API' },
    { label: 'Status', value: 'Active project' },
  ],
  image: {
    src: '/projects/tawerna-gothic/homepage-desktop.webp',
    alt: 'Tawerna Gothic editorial homepage displayed in a browser frame',
    width: 1440,
    height: 900,
  },
} as const;

export const overviewCopy = [
  'The goal of the latest rebuild was not simply to give an old website a new visual design.',
  'Tawerna Gothic contains years of editorial content spanning multiple games, topics and content formats. The new platform needed to preserve that archive while making the website faster, easier to navigate and significantly easier to develop further.',
  'The result is a customized WordPress platform with a dedicated child theme, purpose-built content views, a redesigned information architecture, custom SEO functionality and integrations supporting publishing, analytics and the broader Tawerna Gothic ecosystem.',
];

export const roleCopy = [
  'I created Tawerna Gothic from scratch in 2005 and have remained responsible for the project throughout its evolution.',
  'For the current generation of the platform, I define the product direction, information architecture, functional and visual requirements, development priorities and acceptance criteria.',
  'I also manage the hosting environment, WordPress configuration, deployments, maintenance and part of the direct implementation work.',
  'For more complex development I use Codex as an implementation tool inside a structured AI-assisted development workflow. I define the problem and desired behavior, prepare specifications and development plans, review implementation and testing, and make the final product decisions.',
  'This allows me to focus more heavily on architecture, product decisions and parallel project development while using AI to accelerate implementation and verification.',
];

export const timeline: TimelineEntry[] = [
  {
    period: '2005',
    title: 'Hand-coded HTML',
    description:
      'Tawerna Gothic begins as a personal fan site built from scratch around a long-term interest in the Gothic series.',
  },
  {
    period: 'Later years',
    title: 'CMS generations',
    description:
      'The platform evolves through different content management systems while its editorial archive and community continue to grow.',
  },
  {
    period: '2026',
    title: 'WordPress rebuild',
    description:
      'The current generation is rebuilt around WordPress with a custom content architecture, dedicated presentation layer and controlled migration process.',
  },
  {
    period: 'Current',
    title: 'Active platform',
    description:
      'Tawerna Gothic continues to evolve as both a public gaming website and a practical environment for developing reusable technical patterns.',
  },
];

export const migrationMetrics: CaseStudyMetric[] = [
  { value: '1,017', label: 'Posts migrated and verified' },
  { value: '428', label: 'Media files included' },
  { value: '9,299', label: 'URLs audited' },
  { value: '0', label: 'Missing posts or detected content differences' },
];

export const informationArchitecture = {
  dimensions: [
    {
      label: 'TOPIC',
      title: 'What the content is about',
      examples: ['Game', 'Series', 'Subject'],
    },
    {
      label: 'CONTENT FUNCTION',
      title: 'What the user is looking for',
      examples: ['News', 'Guides', 'Game information', 'Bestiary', 'Items', 'Walkthroughs'],
    },
  ],
  discoveryPaths: ['Homepage', 'Game hub', 'Functional section', 'Archive', 'Search'],
} as const;

export const platformFeatures = [
  'purpose-built editorial homepage',
  'dedicated article templates',
  'dedicated search results',
  'game and content hub archives',
  'reusable content cards',
  'responsive navigation',
  'custom SEO functionality',
  'popularity-based content modules',
  'YouTube integration with caching and fallback behavior',
  'supporting operational and migration tooling',
];

export const platformArchitecture = {
  user: 'Users',
  platform: 'WordPress',
  branches: [
    {
      title: 'WordPress Core',
    },
    {
      title: 'ColorMag Parent Theme',
      child: {
        title: 'Tawerna Gothic Child Theme',
        items: ['Editorial Homepage', 'Article Views', 'Search', 'Content Hubs', 'SEO Layer'],
      },
    },
    {
      title: 'Operational Integration Layer',
      items: ['Content Taxonomy', 'Migration Support', 'Controlled Admin Operations'],
    },
    {
      title: 'Content & Data',
      items: ['Posts', 'Media', 'Categories', 'Content Sections'],
    },
    {
      title: 'External Integrations',
      items: ['YouTube', 'Analytics', 'Advertising', 'Consent'],
    },
  ],
} as const;

export const challenges: Challenge[] = [
  {
    title: 'Migrating a long-running archive',
    problem: 'Years of editorial content had to move to the new platform without losing posts, media or content integrity.',
    approach:
      'Snapshots, staged validation and post-migration comparison were used instead of treating the migration as a one-step import.',
    result: '1,017 migrated posts were verified with no missing posts and no detected content differences.',
  },
  {
    title: 'Designing information architecture for different user intents',
    problem:
      'A conventional category tree could describe what an article was about, but not always what kind of information the reader was looking for.',
    approach:
      'The platform separates subject taxonomy from content function using a dedicated hierarchical taxonomy.',
    result:
      'The same article can appear naturally through game hubs, functional sections, archives and search without content duplication.',
  },
  {
    title: 'Modernizing the platform without making it heavy',
    problem:
      'The redesign needed to support a richer content structure without turning a straightforward information website into an unnecessarily complex application.',
    approach:
      'The rebuild uses dedicated WordPress templates, bounded queries, cached external integrations and a lightweight presentation layer.',
    result:
      'Responsive verification covered 28 controlled desktop and mobile views with no horizontal overflow detected.',
  },
];

export const performanceFeatures = [
  'bounded WordPress queries',
  'avoiding unnecessary pagination calculations',
  'caching external YouTube data',
  'request timeouts and fallbacks',
  'controlled asset loading',
  'asynchronous image decoding',
  'dedicated lightweight templates',
];

export const performanceMetrics: CaseStudyMetric[] = [
  { value: '660 ms', label: 'Desktop LCP' },
  { value: '352 ms', label: 'Mobile LCP' },
  { value: '0.0011', label: 'Desktop CLS' },
  { value: '0', label: 'Mobile CLS' },
];

export const seoFeatures = [
  'titles and descriptions',
  'canonical URLs',
  'Open Graph',
  'Twitter Cards',
  'JSON-LD',
  'robots directives',
  'sitemap integration',
  'thematic content hubs',
];

export const workflowStages = [
  'Requirements',
  'Specification',
  'Implementation Plan',
  'RED',
  'Implementation with Codex',
  'GREEN',
  'Validation',
  'Pre-deployment',
  'Production Verification',
];

export const workflowRoles = {
  human: ['product direction', 'requirements', 'architecture', 'priorities', 'acceptance criteria', 'review', 'final decisions'],
  ai: ['analysis support', 'implementation', 'test generation and execution', 'documentation', 'repetitive technical work'],
};

export const validationMetrics: CaseStudyMetric[] = [
  { value: '28', label: 'Desktop and mobile views reviewed' },
  { value: '0', label: 'Horizontal overflow detected in the controlled set' },
  { value: '94', label: 'Behavioral assertions for the privacy and consent implementation' },
];

export const validationAreas = [
  'homepage behavior',
  'navigation',
  'SEO',
  'migration integrity',
  'advertising integration',
  'consent behavior',
  'production URL checks',
];

export const galleryItems: GalleryItem[] = [
  {
    src: '/projects/tawerna-gothic/homepage-desktop.webp',
    alt: 'Tawerna Gothic editorial homepage on desktop',
    width: 1440,
    height: 900,
    caption: 'Editorial homepage with a controlled content hierarchy.',
  },
  {
    src: '/projects/tawerna-gothic/case-study/gothic-remake-hub-desktop.webp',
    alt: 'Gothic Remake content hub on Tawerna Gothic at desktop width',
    width: 1440,
    height: 900,
    caption: 'Gothic Remake content hub combining topic navigation with functional content sections.',
  },
  {
    src: '/projects/tawerna-gothic/case-study/gothic-remake-hub-mobile.webp',
    alt: 'Gothic Remake content hub on Tawerna Gothic at mobile width',
    width: 390,
    height: 844,
    caption: 'Responsive content hub on mobile.',
    mobile: true,
  },
  {
    src: '/projects/tawerna-gothic/case-study/search-desktop.webp',
    alt: 'Tawerna Gothic search results for Gothic Remake on desktop',
    width: 1440,
    height: 900,
    caption: 'Dedicated search presentation using the shared content card system.',
  },
];

export const reusableFoundation = [
  'separating subject taxonomy from content function',
  'controlled editorial homepage composition',
  'reusable content cards',
  'dedicated archive and search templates',
  'caching and fallback strategies for external integrations',
  'specification-first implementation',
  'explicit pre-deployment and production verification',
];

export const lessons = [
  'Architecture matters more as content volume grows.',
  'Migration should be treated as a data integrity problem.',
  'Performance should be a design constraint from the beginning.',
  'Verification should continue after deployment.',
  'Good AI-assisted development depends on good specifications and human ownership of decisions.',
  'Reusable foundations are more valuable than copying complete implementations.',
];
