# nikkapaola.com — Functional & Technical Documentation

**Last updated:** March 2026
**Framework:** Astro 6
**Live site:** https://nikkapaola.com

---

## Table of Contents

1. [Overview](#1-overview)
2. [Tech Stack](#2-tech-stack)
3. [Architecture](#3-architecture)
4. [Pages & Routes](#4-pages--routes)
5. [Components](#5-components)
6. [Layouts](#6-layouts)
7. [Design System](#7-design-system)
8. [Content Management](#8-content-management)
9. [Features](#9-features)
10. [Build & Deployment](#10-build--deployment)
11. [Configuration Reference](#11-configuration-reference)

---

## 1. Overview

**nikkapaola.com** is a personal blog and portfolio site for Nikka — a software developer, thyroid cancer survivor, chronic traveler, and personal finance writer. It is built as a static site using Astro, with React islands for interactive UI.

**Primary goals:**
- Publish long-form blog posts across Life, Work, and Travel categories
- Showcase photo albums from travels
- Maintain a `/now` page as a living snapshot of current activities
- Be fast, accessible, and readable without JavaScript for most content

---

## 2. Tech Stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Site framework | Astro | ^6.0.4 | Static-first; React islands for interactivity |
| UI components | React | ^19.2.4 | Used only where interactivity is needed |
| Styling | Tailwind CSS | ^4.2.1 | Configured via `@tailwindcss/vite` Vite plugin |
| Markdown | MDX | ^5.0.0 | Rich posts with embedded React components |
| Syntax highlighting | Shiki | bundled | Code blocks in blog posts |
| Search | Pagefind | ^1.4.0 | Post-build static search index |
| Sitemap | @astrojs/sitemap | ^3.7.1 | Auto-generated at build time |
| RSS | @astrojs/rss | ^4.0.17 | Feed at `/rss.xml` |
| Image optimisation | sharp + astro:assets | ^0.34.3 | Resize, WebP conversion, lazy loading |
| Node | — | >=22.12.0 | Minimum required version |

---

## 3. Architecture

### Rendering model

Astro renders all pages to static HTML at build time. JavaScript is only shipped for components that explicitly need it. Interactive React components use the `client:load` directive, meaning they hydrate immediately on page load.

```
src/
├── assets/              # Static assets processed by Astro (images)
├── components/          # Reusable Astro + React components
├── content/
│   └── blog/            # Blog posts (.md and .mdx files)
├── layouts/             # Page layout templates
├── pages/               # File-based routing (each file = a route)
├── styles/
│   └── global.css       # Design tokens + base styles
└── content.config.ts    # Content collection schema (Zod)

public/                  # Static files served as-is (no processing)
├── favicon.ico
├── fonts/
└── robots.txt

astro.config.mjs         # Astro + Vite configuration
```

### Data flow for blog posts

```
src/content/blog/*.md → Content Collections (Zod) → getCollection() → BlogPost layout → HTML
```

1. Markdown/MDX files are validated against the Zod schema in `content.config.ts`
2. The dynamic route `src/pages/blog/[...slug].astro` calls `getStaticPaths()` to generate one HTML page per post
3. Each post is rendered through the `BlogPost.astro` layout
4. Pagefind crawls the built HTML and builds a search index

---

## 4. Pages & Routes

### `/` — Homepage

**File:** `src/pages/index.astro`

Sections (top to bottom):
- **Hero** — split-grid layout: left side has the site title, tagline, topic tag pills (Life, Work, Travel, Health), and CTA buttons; right side shows the hero photo (`src/assets/myphoto.jpg`) with two floating accent cards
- **Topics** — 4-column icon + label grid linking to category-filtered blog pages (`/blog?cat=...`)
- **Recent Posts** — first post shown as a large featured card (full-width with image); up to 3 more posts shown in a sidebar list
- **About Strip** — full-width dark section with a brief bio and link to `/about`
- **Newsletter** — email subscribe form using `<NewsletterForm />` React component

Data sourced via `getCollection('blog')`, sorted by `pubDate` descending.

---

### `/blog` — Blog Listing

**File:** `src/pages/blog/index.astro`

**Filtering:** Supports URL parameters:
- `?cat=Travel` — filter by category (case-sensitive match to post frontmatter)
- `?tag=philippines` — filter by tag (case-sensitive match)

**Active filter indicator:** When a filter is active, a bar appears below the header showing:
- The active filter label (category name or `#tag`)
- A `✕` link to clear the filter back to `/blog`
- The count of matching posts

**Layout:**
- First post: featured full-width card (image left, metadata right on desktop; stacked on mobile)
- Remaining posts: 3-column card grid on desktop, 1-column on mobile

---

### `/blog/[slug]` — Individual Blog Post

**File:** `src/pages/blog/[...slug].astro`

Generates one static page per file in `src/content/blog/`. Calls `getStaticPaths()` using `getCollection('blog')`.

Passes `id={post.id}` plus all `post.data` fields to the `BlogPost` layout.

---

### `/about` — About Page

**File:** `src/pages/about.astro`

Static page with personal bio content.

---

### `/now` — Now Page

**File:** `src/pages/now.astro`

A [/now page](https://nownownow.com/about) — a snapshot of current activities. Sections:
- Where I am (location)
- Work (current projects/roles)
- The big thing (major life event — currently: move to Poland)
- Reading (current books)
- Health (post-thyroid cancer status)
- Writing (topics in draft)

Has a `lastUpdated` variable at the top of the frontmatter block — update this date whenever the page content changes.

---

### `/search` — Search

**File:** `src/pages/search.astro`

Loads Pagefind UI at runtime. Only functional after `npm run build` (Pagefind indexes the built HTML). In dev mode, shows a styled notice directing users to the blog listing instead.

**Implementation notes:**
- CSS loaded via `<link href="/pagefind/pagefind-ui.css" />`
- JS loaded via `is:inline` dynamic import (bypasses Vite bundling)
- Graceful fallback: catches import error, hides the search box, shows the notice
- `rollupOptions.external` in `astro.config.mjs` prevents Vite from trying to bundle the runtime-only pagefind asset

---

### `/404` — Custom 404

**File:** `src/pages/404.astro`

Custom not-found page. Shows a large faded "404" number, a heading with italic terracotta styling, and two CTA buttons: "Go Home" and "Browse Blog".

---

### `/rss.xml` — RSS Feed

**File:** `src/pages/rss.xml.js`

Generates an RSS 2.0 feed from all blog posts using `@astrojs/rss`. Includes title, description, link, and pub date for each post.

---

### `/sitemap-index.xml`

Auto-generated by the `@astrojs/sitemap` integration at build time. No source file — controlled entirely via the Astro config `site` option.

---

## 5. Components

### Astro Components

#### `BaseHead.astro`

Renders the entire `<head>` element. Used in every page and the `BlogPost` layout.

**Props:**
```typescript
{
  title: string;
  description: string;
  image?: ImageMetadata;  // used for Open Graph og:image
}
```

**What it includes:**
- Inline theme script (sets `html[data-theme]` from localStorage before paint — prevents dark mode flash)
- Charset, viewport meta
- Favicon link (`/favicon.ico`)
- Sitemap link
- RSS alternate link
- Canonical URL
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`)
- Twitter Card tags
- Google Fonts preconnect + stylesheet (Playfair Display, DM Sans)
- Global CSS import

---

#### `Header.astro`

Fixed top navigation bar with glassmorphism background.

**Contents:**
- Logo (text link to `/`)
- Nav links: Life → `/blog?cat=Life`, Work → `/blog?cat=Work`, Travel → `/blog?cat=Travel`, About → `/about`
- Search icon (link to `/search`)
- `<DarkModeToggle client:load />` React component
- `<MobileMenu client:load />` React component

Glassmorphism effect: `background: var(--color-nav-bg)` with `backdrop-filter: blur`. The `--color-nav-bg` token changes between light and dark mode.

---

#### `Footer.astro`

Site footer.

**Contents:**
- Logo + tagline
- Nav links: Now (`/now`), LinkedIn, GitHub, RSS (`/rss.xml`), Contact (email mailto)
- Copyright with dynamic current year

---

#### `FormattedDate.astro`

Renders a `<time>` element with a human-readable date.

**Props:** `{ date: Date }`
**Output example:** `March 14, 2026`

---

#### `HeaderLink.astro`

A nav link that applies an `active` CSS class when the current page matches the link's `href`.

**Props:** Extends `HTMLAttributes<'a'>` (standard anchor attributes).

---

### React Components

All React components are placed in `src/components/*.tsx` and hydrated with `client:load` — they render on both server (HTML) and client (hydration).

---

#### `DarkModeToggle.tsx`

A pill-shaped toggle button that switches between light and dark mode.

**No props.**

**Behavior:**
- On mount: reads `document.documentElement.dataset.theme` to sync initial state
- On click: toggles `html[data-theme]` between `"light"` and `"dark"`, persists to `localStorage.theme`
- Renders `☾` when in light mode (clicking switches to dark), `☀` when in dark mode

---

#### `MobileMenu.tsx`

Hamburger navigation menu for small screens.

**No props.**

**Behavior:**
- Renders a hamburger button (3 animated bars → × when open)
- On click: shows a dropdown overlay with full nav links
- Same links as the desktop header

---

#### `NewsletterForm.tsx`

Email subscription form.

**No props.**

**State:** `idle | loading | success | error`

**Current status:** The form submission is a placeholder (800ms simulated delay then success). To wire it up, replace the `handleSubmit` async function with a real API call to Buttondown, ConvertKit, Mailchimp, or similar.

---

#### `PhotoGallery.tsx`

Masonry-style image grid with a fullscreen lightbox. Used inside `.mdx` blog posts.

**Props:**
```typescript
{
  images: string[];         // Array of image URLs or paths
  captions?: string[];      // Captions matched by index to images (optional)
  columns?: 2 | 3 | 4;     // Grid column count — default: 3
}
```

**Features:**
- Grid with hover scale animation on each image
- Click opens fullscreen lightbox with dark overlay
- Lightbox shows image counter (e.g., "2 / 15") and optional caption
- Keyboard navigation: `←` / `→` arrows to navigate, `Esc` to close
- Prev/next chevron buttons on the lightbox

**Usage in MDX:**
```mdx
import PhotoGallery from '../../components/PhotoGallery.tsx';

<PhotoGallery
  client:load
  images={["https://cdn.../1.jpg", "https://cdn.../2.jpg"]}
  captions={["Caption 1", "Caption 2"]}
  columns={3}
/>
```

---

## 6. Layouts

### `BlogPost.astro`

**File:** `src/layouts/BlogPost.astro`

**Props:** `CollectionEntry<'blog'>['data'] & { id: string }`

**Sections:**

1. **Cover image** (conditional on `heroImage`): full-width, 55vh tall, with a gradient fade at the bottom blending into the page background

2. **Post header:**
   - Category label (uppercase, terracotta, with decorative line)
   - Title (Playfair Display serif)
   - Description (italic, muted)
   - Meta row: publication date · updated date (if present) · reading time (if present)
   - Tag pills (link to `/blog?tag=...`)

3. **Prose content:** `<div class="prose">` — styles all body content (headings, paragraphs, links, blockquotes, code blocks, tables, images)

4. **Post footer:** "← Back to all posts" link

5. **Related posts** (conditional — only renders if matches found):
   - Queries all blog posts at build time, filters by same `category` OR shared `tags`, excludes current post, takes the 3 most recent
   - Renders a 3-column card grid (1-column on mobile) with image, category, title, and date

The article element has `data-pagefind-body` — this tells Pagefind to index only the post content area, not the nav or footer.

---

## 7. Design System

All design tokens are CSS custom properties defined in `src/styles/global.css` under `@theme {}` (Tailwind 4 syntax).

### Color Palette

| Token | Light value | Purpose |
|-------|-------------|---------|
| `--color-cream` | `#faf7f2` | Page background |
| `--color-warm-white` | `#f5f1eb` | Card backgrounds, subtle surfaces |
| `--color-ink` | `#1c1a17` | Primary text |
| `--color-ink-soft` | `#3d3a35` | Secondary text |
| `--color-muted` | `#8a8479` | Tertiary text, metadata |
| `--color-terracotta` | `#c4694f` | Primary accent — CTAs, links, active states |
| `--color-terracotta-light` | `#e8c4b8` | Underline colour on links |
| `--color-terracotta-dark` | `#b05840` | Hover state on terracotta elements |
| `--color-sage` | `#7a9e87` | Secondary accent |
| `--color-border` | `#e8e2d9` | Dividers, card borders |
| `--color-nav-bg` | `rgba(250,247,242,0.88)` | Header glassmorphism |
| `--color-code-bg` | `#1c1a17` | Code block background (always dark) |
| `--color-code-text` | `#faf7f2` | Code block text (always light) |

### Dark Mode

Dark mode overrides are applied two ways:
1. **Manual toggle:** `html[data-theme="dark"]` — set by `DarkModeToggle.tsx` via `localStorage`
2. **OS preference:** `@media (prefers-color-scheme: dark)` with `html:not([data-theme="light"])` — respects system setting unless user has manually chosen light

Flash prevention: `BaseHead.astro` includes an `is:inline` script that reads `localStorage.theme` and sets `html[data-theme]` synchronously before the first paint.

### Typography

| Font | Token | Usage |
|------|-------|-------|
| Playfair Display | `--font-serif` | Post titles, section headings, pull quotes |
| DM Sans | `--font-sans` | Body copy, UI, metadata |

Both loaded from Google Fonts via `<link>` in `BaseHead.astro`.

### `.prose` class

Applied to the blog post body `<div>`. Styles:
- Headings: serif, various sizes, `--color-ink`
- Paragraphs: 1.8 line height, `--color-ink-soft`, font-weight 300
- Links: terracotta with underline
- Blockquotes: left border in terracotta, italic
- `<code>`: warm-white background, border, rounded
- `<pre>` blocks: dark background (`--color-code-bg`), always dark regardless of theme
- Tables: bordered with `--color-border`
- Images: full width, rounded corners

---

## 8. Content Management

### Writing a new post

1. Create a file in `src/content/blog/`:
   - `.md` for standard Markdown
   - `.mdx` for posts that use React components (e.g., `<PhotoGallery />`)

2. Add frontmatter:

```yaml
---
title: "Post Title"
description: "One sentence shown on cards and in search results."
pubDate: 2026-03-24
updatedDate: 2026-03-25       # optional
heroImage: ./cover.jpg        # optional — relative path to image file
category: "Travel"            # optional — one of: Life, Work, Travel, Health, Meta
tags: ["philippines", "food"] # optional — lowercase, hyphenated
readingTime: "5 min read"     # optional — fill manually
isAlbum: false                # optional — true for photo-album posts
---
```

3. Write the post body below the `---` closing fence.

### Rules

- **Do not use `# H1`** in the post body — the layout renders the `title` as an `<h1>` automatically
- **Hero images:** Place the image file in the same folder as the `.md` file; use a relative path in `heroImage`
- **Large photo albums:** Do not commit full-resolution images to the Git repo — use a CDN (Cloudinary recommended)
- **Tags** are used for URL filtering (`/blog?tag=philippines`); keep them consistent across posts
- **Categories** are free-form but should match the nav labels for category filtering to work: `Life`, `Work`, `Travel`, `Health`

### Photo album posts

For posts showcasing a photo gallery:

1. Set `isAlbum: true` in frontmatter
2. Use `.mdx` extension
3. Import and use `<PhotoGallery />`:

```mdx
import PhotoGallery from '../../components/PhotoGallery.tsx';

<PhotoGallery
  client:load
  images={["https://cdn.example.com/1.jpg", "https://cdn.example.com/2.jpg"]}
  captions={["Caption 1", "Caption 2"]}
  columns={3}
/>
```

**Recommended image hosts (free tiers available):**
- **Cloudinary** — 25 GB storage / 25 GB bandwidth/month; easy CDN URLs; has Astro integration
- **Cloudflare R2** — 10 GB storage, zero egress cost; S3-compatible

---

## 9. Features

### Search (Pagefind)

- Pagefind indexes the static HTML at build time by scanning elements with `data-pagefind-body`
- The index is written to `dist/pagefind/` and served at `/pagefind/`
- `search.astro` dynamically imports Pagefind UI at runtime — if the import fails (dev mode), a styled fallback notice is shown
- The `/pagefind/pagefind-ui.js` asset is excluded from Vite bundling via `rollupOptions.external`

**To search:** navigate to `/search` on the built/preview site.

### Dark Mode

- Default: follows the OS preference (`prefers-color-scheme: dark`)
- User override: clicking the toggle in the header persists the choice in `localStorage.theme`
- Flash prevention: `BaseHead.astro` sets `html[data-theme]` synchronously before paint

### Related Posts

On every blog post, the `BlogPost.astro` layout queries all posts and finds those sharing the same `category` OR one or more `tags`. It shows up to 3, sorted by most recent. If no related posts exist, the section is hidden.

### RSS Feed

Available at `/rss.xml`. Includes all published posts with title, description, publication date, and a link to the full post. Subscribe-friendly for feed readers.

### Active Filter Indicator

On `/blog`, when filtering by category or tag, a bar appears showing:
- The active filter (e.g., "Travel" or "#philippines")
- A `✕` button to remove the filter
- The number of matching posts

### Sitemap

`/sitemap-index.xml` and `/sitemap-0.xml` are auto-generated by `@astrojs/sitemap`. Every page in `src/pages/` is included automatically.

---

## 10. Build & Deployment

### Development

```bash
npm run dev       # Start dev server at http://localhost:4321
```

In dev mode:
- Astro's dev server handles HMR (hot module replacement)
- Pagefind search is NOT available (index doesn't exist yet)
- Use the blog listing page (`/blog`) to browse posts

### Production build

```bash
npm run build
```

This runs two steps:
1. `astro build` — compiles all pages to static HTML in `./dist/`
2. `pagefind --site dist` — crawls the built HTML, writes search index to `dist/pagefind/`

### Preview

```bash
npm run preview   # Serves ./dist/ locally — search works here
```

### Deployment

The `./dist/` folder is a self-contained static site. Deploy to any static hosting platform:
- **Cloudflare Pages** (recommended — zero config, free, global CDN)
- **Netlify** — drag-and-drop or Git integration
- **Vercel** — Git integration with Astro adapter

For Cloudflare Pages / Netlify / Vercel: set the build command to `npm run build` and the output directory to `dist`.

---

## 11. Configuration Reference

### `astro.config.mjs`

```javascript
{
  site: 'https://nikkapaola.com',  // Required for canonical URLs and sitemap
  integrations: [
    mdx(),       // MDX support for blog posts
    sitemap(),   // Auto sitemap generation
    react(),     // React component support
  ],
  markdown: {
    syntaxHighlight: 'shiki',      // Code block highlighting
  },
  vite: {
    plugins: [tailwindcss()],      // Tailwind CSS 4 via Vite plugin
    build: {
      rollupOptions: {
        external: ['/pagefind/pagefind-ui.js'],  // Exclude runtime-only asset
      },
    },
  },
}
```

**Important:** If you change the domain, update `site` here. This affects canonical URLs, OG URLs, the sitemap, and the RSS feed.

### `src/consts.ts`

```typescript
export const SITE_TITLE = 'nikkapaola.com';
export const SITE_DESCRIPTION = '...';
```

Used in `<BaseHead>` for default page titles and in the RSS feed.

### `src/content.config.ts`

Defines the Zod schema for the `blog` content collection. To add new frontmatter fields, add them here and they will be type-safe everywhere via `CollectionEntry<'blog'>`.

### `public/robots.txt`

Controls what search engine crawlers can index. Currently set to allow all crawlers to index all pages.

### `public/favicon.ico`

16×16 and 32×32 icon served as the browser tab icon. Referenced in `BaseHead.astro`.
