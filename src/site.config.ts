// ─────────────────────────────────────────────────────────────────────────────
// site.config.ts — Single file to customize per client.
//
// For a new client (e.g. misspaolasal.com):
//   1. Edit every value in this file
//   2. Swap design tokens in src/styles/global.css (@theme block)
//   3. Replace src/assets/myphoto.jpg
//   4. Update astro.config.mjs `site:` URL
//   5. Replace content in src/content/blog/ and src/content/projects/
// ─────────────────────────────────────────────────────────────────────────────

// ── Types ─────────────────────────────────────────────────────────────────────

export interface LogoConfig {
  /** Plain-color segment, e.g. "nikka" */
  part1: string;
  /** Accent-color segment, e.g. "paola" */
  part2: string;
  /** Appended after part2 in plain color. Footer uses it; Header omits it. */
  suffix?: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface FooterLink {
  label: string;
  href: string;
  /** When true, opens in a new tab with rel="noopener" */
  external?: boolean;
}

export interface AuthorConfig {
  /** Full name — used in AuthorCard */
  name: string;
  /** Short name — used in copyright line and RSS feed */
  shortName: string;
  /** One-liner bio shown in AuthorCard */
  bio: string;
}

export interface SocialConfig {
  twitter?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  linkedin?: string;
  github?: string;
  threads?: string;
  pinterest?: string;
  email?: string;
}

export interface AnalyticsConfig {
  /** GA4 measurement ID, e.g. "G-XXXXXXXX". Set to undefined to disable entirely. */
  googleAnalyticsId?: string;
  /** Your domain as registered in Plausible, e.g. "nikkapaola.com" */
  plausibleDomain?: string;
  /** Microsoft Clarity project ID */
  microsoftClarityId?: string;
}

export interface NewsletterConfig {
  provider: 'buttondown' | 'kit' | 'beehiiv' | 'mailchimp';
  /** Full form action URL for the chosen provider */
  endpoint: string;
}

export interface CommentsConfig {
  giscusRepo: string;
  giscusRepoId: string;
  giscusCategory: string;
  giscusCategoryId: string;
  giscusMapping: 'pathname' | 'title' | 'og:title';
}

export interface KofiConfig {
  username: string;
}

export type TagStyle =
  | 'tag-rose'
  | 'tag-sage'
  | 'tag-gold'
  | 'tag-blue'
  | 'tag-lavender'
  | 'tag-blossom';

export type TopicColor =
  | 'terracotta'
  | 'dusty-rose'
  | 'gold'
  | 'sage'
  | 'blue'
  | 'lavender';

export interface HeroTag {
  label: string;
  style: TagStyle;
}

export interface FloatingCard {
  icon: string;
  label: string;
  value: string;
}

export interface HeroConfig {
  tagline: string;
  tags: HeroTag[];
  /** Exactly two floating cards shown over the hero photo */
  floatingCards: [FloatingCard, FloatingCard];
  photoAlt: string;
}

export interface AboutFact {
  emoji: string;
  label: string;
  value: string;
}

export interface AboutStripConfig {
  bio: string;
  /** Exactly four facts shown in the 2×2 grid */
  facts: [AboutFact, AboutFact, AboutFact, AboutFact];
}

export interface Topic {
  icon: string;
  name: string;
  desc: string;
  count: string;
  color: TopicColor;
  /** Used in /blog?cat= query param */
  cat: string;
}

export interface SiteConfig {
  /** Browser tab title and OG title fallback */
  title: string;
  /** Site description for meta tags and RSS */
  description: string;
  /** Canonical site URL — also set in astro.config.mjs */
  url: string;
  logo: LogoConfig;
  author: AuthorConfig;
  social: SocialConfig;
  /** Main nav — single source for Header desktop links and MobileMenu */
  nav: NavLink[];
  footerLinks: FooterLink[];
  analytics: AnalyticsConfig;
  /** Only required when FEATURES.newsletter = true */
  newsletter?: NewsletterConfig;
  /** Only required when FEATURES.comments = true */
  comments?: CommentsConfig;
  /** Only required when FEATURES.kofi = true */
  kofi?: KofiConfig;
  hero: HeroConfig;
  aboutStrip: AboutStripConfig;
  topics: Topic[];
}

// ── Feature Flags ─────────────────────────────────────────────────────────────
// When false: no route, no script tag, no UI is emitted for that feature.
// Change these to true once the corresponding feature is ready for this client.

export const FEATURES = {
  // ── Core content ────────────────────────────────
  blog: true,
  projects: true,
  nowPage: true,
  search: true,
  rss: true,
  /**
   * Fragments: short-form posts on a timeline.
   * When false: /fragments returns 404, nav link is hidden.
   * When true: page is live and nav link appears.
   */
  fragments: true,

  // ── Special pages ────────────────────────────────
  /** /apps — published apps and business ventures */
  appsPage: true,
  /** /media-kit page */
  mediaKit: false,
  /** /links — Instagram-style link-in-bio hub */
  linksPage: false,
  /** /speaking — past talks, upcoming events, booking CTA */
  speaking: false,

  // ── Engagement ──────────────────────────────────
  /** Email capture form wired to a newsletter provider */
  newsletter: false,
  /** Giscus comment threads on blog posts */
  comments: false,
  /** /guestbook page */
  guestbook: false,

  // ── Blog post UX ────────────────────────────────
  tableOfContents: true,
  readingProgress: true,
  /** Twitter/X + copy-link buttons at post footer */
  socialSharing: false,
  /** Auto-generated Open Graph image per post (Satori) */
  dynamicOgImages: false,

  // ── Monetization ────────────────────────────────
  /** Floating Ko-fi button on all pages */
  kofi: false,

  // ── Privacy ─────────────────────────────────────
  /** Cookie consent banner — enable whenever analytics are active */
  cookieConsent: false,
} as const;

// ── Config ────────────────────────────────────────────────────────────────────

export const siteConfig = {
  title: 'nikkapaola.com',
  description:
    'Personal blog by Nikka — software developer, thyroid cancer survivor, chronic traveler, and personal finance nerd.',
  url: 'https://nikkapaola.com',

  logo: {
    part1: 'nikka',
    part2: 'paola',
    suffix: '.com',
  },

  author: {
    name: 'Nikka Paola Salgado',
    shortName: 'Nikka Paola',
    bio: 'Developer, traveler, thyroid cancer survivor. Writing about life, code, money, and the things in between.',
  },

  social: {
    linkedin: 'https://linkedin.com/in/nikkasalgado',
    github: 'https://github.com/salgadonikka',
    email: 'nikkapfs@gmail.com',
  },

  nav: [
    { href: '/blog',      label: 'Blog' },
    { href: '/now',       label: 'Now' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/projects',  label: 'Projects' },
    { href: '/about',     label: 'About' },
  ],

  footerLinks: [
    { label: 'Now',       href: '/now',                                    external: false },
    { label: 'LinkedIn',  href: 'https://linkedin.com/in/nikkasalgado',    external: true  },
    { label: 'GitHub',    href: 'https://github.com/salgadonikka',         external: true  },
    { label: 'RSS',       href: '/rss.xml',                                external: true  },
    { label: 'Contact',   href: 'mailto:nikkapfs@gmail.com',               external: false },
  ],

  analytics: {
    // Reads from env var at deploy time; falls back to hardcoded ID.
    // Set to undefined to disable GA entirely for a client.
    googleAnalyticsId: (import.meta.env.PUBLIC_GA_ID as string | undefined) ?? 'G-8C1XB9DFDG',
  },

  // newsletter: {
  //   provider: 'buttondown',
  //   endpoint: 'https://buttondown.com/api/emails/embed-subscribe/YOUR_USERNAME',
  // },

  // comments: {
  //   giscusRepo: 'owner/repo',
  //   giscusRepoId: '',
  //   giscusCategory: 'Announcements',
  //   giscusCategoryId: '',
  //   giscusMapping: 'pathname',
  // },

  // kofi: {
  //   username: 'your-username',
  // },

  hero: {
    tagline: 'A documentation of my life.',
    tags: [
      { label: 'Health',               style: 'tag-rose'     },
      { label: 'Travel',               style: 'tag-gold'     },
      { label: 'Software Development', style: 'tag-blue'     },
      { label: 'Finance',              style: 'tag-lavender' },
    ],
    floatingCards: [
      { icon: '📍', label: 'Currently in', value: 'Philippines'          },
      { icon: '🌱', label: 'Next chapter',  value: 'Something exciting, TBA' },
    ],
    photoAlt: 'Nikka Paola',
  },

  aboutStrip: {
    bio: "I'm Nikka, a Filipino software developer with a lot going on. This blog is where I write about the things I want to remember and the things I think might help someone else. I'm trying to live life intentionally and I want to put out something positive into the world. Cancer, code, money, travel, and the slow work of building a life that actually fits.",
    facts: [
      { emoji: '🇵🇭', label: 'Based in',        value: 'Manila, Philippines' },
      { emoji: '🌱',   label: 'Next chapter',    value: 'A big move, soon'   },
      { emoji: '💼',   label: 'By day',          value: 'Software Developer' },
      { emoji: '✈️',  label: 'Countries visited', value: 'Still counting...' },
    ],
  },

  topics: [
    { icon: '🌸', name: 'Life & Self',      desc: 'Reflections, routines, and some life nuggets.',             count: 'Personal · Journal',   color: 'terracotta', cat: 'life'      },
    { icon: '🎗️', name: 'Health Journey',   desc: 'Thyroid cancer, recovery, and what comes after.',           count: 'Health · Survival',    color: 'dusty-rose', cat: 'health'    },
    { icon: '🗺️', name: 'Travel',           desc: "Places I've been, things I've learned there.",              count: 'Travel · Photography', color: 'gold',       cat: 'travel'    },
    { icon: '🌙', name: 'A New Chapter',    desc: "Something is taking shape. I'll tell you when it's time.",  count: 'Coming Soon · TBA',    color: 'sage',       cat: 'tba'       },
    { icon: '💻', name: 'Software Dev',     desc: 'Building things, career lessons, and tech thoughts.',       count: 'Tech · Career',        color: 'terracotta', cat: 'work'      },
    { icon: '📊', name: 'Personal Finance', desc: 'Budgeting, saving, and making money less scary.',           count: 'Finance · Org',        color: 'blue',       cat: 'finance'   },
    { icon: '✨', name: 'Hobbies & Misc',   desc: "Everything else that doesn't fit a neat box.",              count: 'Lifestyle · Random',   color: 'lavender',   cat: 'misc'      },
    { icon: '📖', name: 'Learnings',        desc: "Books, courses, and things I'm figuring out.",              count: 'Growth · Notes',       color: 'sage',       cat: 'learnings' },
  ],
} satisfies SiteConfig;

// ── Backwards-compat exports (replaces src/consts.ts) ─────────────────────────
export const SITE_TITLE = siteConfig.title;
export const SITE_DESCRIPTION = siteConfig.description;
