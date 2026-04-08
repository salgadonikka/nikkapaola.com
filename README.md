# nikkapaola.com

Personal blog and portfolio of Nikka Salgado — live at **nikkapaola.com**.

This repo also serves as the **base template for any new blog/portfolio site** I will make in the future. Features are toggled per client via `src/site.config.ts`. Design tokens in `src/styles/global.css` are the theming layer.

---

## Using this as a template

To spin up a new client site:

1. Clone this repo
2. Edit **`src/site.config.ts`** — title, description, URL, logo, author, social links, nav, analytics IDs, hero content, topics
3. Edit **`src/styles/global.css`** — swap `@theme {}` color and font tokens
4. Replace **`src/assets/myphoto.jpg`** with the client's photo
5. Update **`astro.config.mjs`** — set the `site:` URL
6. Replace content in **`src/content/blog/`** and **`src/content/projects/`**
7. Edit **`src/pages/about.astro`** and **`src/pages/now.astro`** directly (personal narrative pages)

No component files need to be touched.

---

## Stack

- **Astro 6** - static site framework
- **React 19** - interactive components (mobile menu, photo gallery, newsletter form)
- **Tailwind CSS 4** - via `@tailwindcss/vite`; all design tokens in `src/styles/global.css`
- **MDX** - rich blog posts with embedded components
- **TypeScript** - content collection schemas and component props

---

## Commands

```bash
npm install        # install dependencies
npm run dev        # dev server at localhost:4321
npm run build      # production build to ./dist/
npm run preview    # preview the production build locally
npm run astro      # run Astro CLI (e.g. astro check, astro add)
```

---

## Project structure

```
src/
  site.config.ts    # ← single file to edit per client (identity, nav, analytics, features)
  consts.ts         # re-exports SITE_TITLE / SITE_DESCRIPTION from site.config.ts
  assets/           # images (processed by Astro's Image pipeline)
  components/
    BaseHead.astro      # <head>: SEO, fonts, conditional analytics (GA / Plausible / Clarity)
    Header.astro        # site nav — driven by site.config nav[]
    Footer.astro        # site footer — driven by site.config footerLinks[]
    DarkModeToggle.tsx  # light/dark toggle (React)
    MobileMenu.tsx      # hamburger nav (React) — accepts navLinks prop from Header
    NewsletterForm.tsx  # email subscribe form (wire endpoint via site.config newsletter)
    PhotoGallery.tsx    # masonry grid + lightbox for album posts (React)
    Callout.astro       # MDX callout block (note / tip / warning / aside)
    Highlight.astro     # MDX editorial pull-quote
    Figure.astro        # MDX image with optional caption
    SEO.astro           # extended Open Graph / Twitter meta
    blog/
      AuthorCard.astro  # sidebar card — name/bio from site.config author
      ReadingProgress.astro  # thin progress bar (FEATURES.readingProgress)
      TableOfContents.astro  # auto-generated from post headings (FEATURES.tableOfContents)
      NowSidebar.astro  # sidebar snippet pulled from /now content
  content/
    blog/               # all posts as .md or .mdx files
    projects/           # project entries as .md or .mdx files
  layouts/
    BlogPost.astro      # layout wrapper for individual posts
  pages/
    index.astro         # homepage
    about.astro         # about page (personal narrative — edit directly)
    now.astro           # /now page (living document — edit directly)
    portfolio.astro     # portfolio / work page
    apps.astro          # /apps page
    search.astro        # Pagefind search (FEATURES.search)
    media-kit.astro     # /media-kit (FEATURES.mediaKit — redirects to / when off)
    links.astro         # /links link-in-bio hub (FEATURES.linksPage)
    speaking.astro      # /speaking (FEATURES.speaking)
    guestbook.astro     # /guestbook (FEATURES.guestbook)
    404.astro           # 404 page
    rss.xml.js          # RSS feed (FEATURES.rss)
    blog/
      index.astro       # blog listing with category + tag filters
      [...slug].astro   # individual post route
    projects/
      index.astro       # projects listing
      [slug].astro      # individual project detail page
  styles/
    global.css          # design tokens (@theme {}), base styles, .prose
    projects.css        # styles for /projects index + detail pages
public/
  resume.pdf
  robots.txt
  favicon.ico
```

---

## Feature flags

All feature toggles live in `src/site.config.ts` under `FEATURES`. When a flag is `false`, no route, no script tag, and no UI is emitted for that feature.

| Flag              | Default | Notes                                                             |
| ----------------- | ------- | ----------------------------------------------------------------- |
| `blog`            | `true`  | Blog listing + post routes                                        |
| `projects`        | `true`  | Projects grid + detail pages                                      |
| `nowPage`         | `true`  | /now page                                                         |
| `search`          | `true`  | Pagefind search (post-build)                                      |
| `rss`             | `true`  | /rss.xml feed                                                     |
| `newsletter`      | `false` | Email capture — set `siteConfig.newsletter.provider` + `endpoint` |
| `comments`        | `false` | Giscus — set `siteConfig.comments.*` with repo IDs                |
| `guestbook`       | `false` | /guestbook — requires a backend (Supabase / Turso)                |
| `tableOfContents` | `true`  | Auto-generated sidebar ToC on blog posts                          |
| `readingProgress` | `true`  | Thin progress bar on blog posts                                   |
| `socialSharing`   | `false` | Twitter/X + copy-link at post footer                              |
| `dynamicOgImages` | `false` | Satori-generated OG image per post                                |
| `mediaKit`        | `false` | /media-kit page                                                   |
| `linksPage`       | `false` | /links link-in-bio hub                                            |
| `speaking`        | `false` | /speaking page                                                    |
| `kofi`            | `false` | Floating Ko-fi button — set `siteConfig.kofi.username`            |
| `cookieConsent`   | `false` | Cookie banner (enable when GA is active)                          |

---

## Analytics

Set IDs in `siteConfig.analytics` in `src/site.config.ts`. Any field left `undefined` emits no script tag.

```ts
analytics: {
  googleAnalyticsId: 'G-XXXXXXXX',   // or import.meta.env.PUBLIC_GA_ID
  plausibleDomain: 'example.com',     // privacy-friendly alternative
  microsoftClarityId: 'xxxxxxxxxx',   // session recording + heatmaps
}
```

To read the GA ID from an environment variable at deploy time, set `PUBLIC_GA_ID` in your `.env` file or hosting dashboard. The hardcoded fallback in `site.config.ts` keeps local dev working without a `.env` file.

---

## Design system

All tokens live in `src/styles/global.css` under `@theme {}`:

| Token                | Value                |
| -------------------- | -------------------- |
| `--color-cream`      | base background      |
| `--color-ink`        | primary text         |
| `--color-ink-soft`   | secondary text       |
| `--color-muted`      | muted / labels       |
| `--color-terracotta` | primary accent       |
| `--color-sage`       | secondary accent     |
| `--color-gold`       | decorative accent    |
| `--color-border`     | borders and dividers |
| `--font-serif`       | Playfair Display     |
| `--font-sans`        | DM Sans              |

Dark mode is controlled via `html[data-theme="dark"]` (user toggle) and `@media (prefers-color-scheme: dark)` (OS default).

---

## Writing a new blog post

Create a `.md` or `.mdx` file in `src/content/blog/`. Frontmatter:

```yaml
---
title: "Post title"
description: "One sentence shown on listing cards."
pubDate: 2026-04-03
category: "Life" # Life | Health | Travel | Software Dev | Finance | Hobbies | Learnings
tags: ["personal", "intention"]
readingTime: "4 min read" # fill manually
heroImage: ./cover.jpg # optional — relative to the .md file
draft: false
---
```

For MDX posts, import components at the top of the file (not in frontmatter):

```mdx
import Callout from "../../components/Callout.astro";
import Highlight from "../../components/Highlight.astro";
import Figure from "../../components/Figure.astro";

<Highlight>A pull-quote styled in serif with gold borders.</Highlight>

<Callout type="note">A quiet aside.</Callout>
<Callout type="tip" title="Worth trying">
  A practical takeaway.
</Callout>
<Callout type="warning">Something to watch out for.</Callout>
<Callout type="aside">Off the main thread.</Callout>

<Figure src="/images/photo.jpg" alt="Description" caption="Optional caption" />
```

---

## Adding a project

Create a `.md` or `.mdx` file in `src/content/projects/`. Frontmatter:

```yaml
---
name: "Project Name"
tagline: "One punchy line shown on the card and as the hero subtitle."
description: "Slightly longer summary used in meta tags."
category: "App" # App | Business | Side Project | Content
status: "In Progress" # Live | In Progress | Planning | Paused
featured: false # true = spans full width on the grid, shows first
order: 3 # lower number = higher on index page
stack:
  - React 18
  - TypeScript
tags:
  - tamelo
  - productivity # matched against blog post tags for "Writing about this"
url: "https://example.com" # optional — shows "Visit site" button
githubUrl: "https://github.com/…" # optional — shows "View on GitHub" button
screenshots:
  - "https://cdn.example.com/screenshot-1.jpg" # optional; first is the hero
draft: false
---
```

The body of the file is rendered as the **Overview** section on the detail page. Use `##` headings to add sub-sections (e.g., How it works, What's next). Related blog posts are auto-pulled from matching `tags`.

---

## Links page (`/links`)

A Linktree-style link-in-bio page at `src/pages/links.astro`. Enable it with `FEATURES.linksPage: true` in `site.config.ts`.

The page uses the site's global styling (`BaseHead`, design tokens, dark mode) and includes the site `Header` by default. Both can be opted out via comments in the file.

All optional sections are self-contained commented blocks — uncomment to enable:

| Section | What it does |
| ------- | ------------ |
| Featured CTA link | One prominent call-to-action button above the link list |
| Link list | Vertical stack of link buttons — add/remove `<a>` tags |
| Section dividers | Labeled group headings between links (Content / Shop / Connect) |
| Latest blog post | Auto-pulled from the content collection, sorted by date |
| Newsletter form | Reuses `NewsletterForm.tsx`; requires `FEATURES.newsletter` |
| Ko-fi button | Requires `FEATURES.kofi` + `siteConfig.kofi.username` |
| YouTube embed | `<iframe>` — replace `VIDEO_ID` |
| Spotify embed | `<iframe>` — replace `TRACK_OR_PLAYLIST_ID` |
| Social post embed | TikTok / Instagram blockquote embed |
| Custom background | Swap the `background:` value in `.links-page` CSS |
| Discount codes | Copyable promo code cards with brand name, description, and expiry; click-to-copy via JS |

Style overrides for this page (accent color, button shape, font, background) are documented as commented blocks at the top of the `<style>` tag in `links.astro`. All other pages are unaffected.

---

## Photo album posts

For posts that are primarily photos, set `isAlbum: true` in frontmatter and use `PhotoGallery` in MDX:

```mdx
import PhotoGallery from "../../components/PhotoGallery.tsx";

<PhotoGallery
  client:load
  images={["https://cdn.example.com/1.jpg", "https://cdn.example.com/2.jpg"]}
  captions={["Caption one", "Caption two"]}
  columns={3}
/>
```

Do not commit large images to the repo. Use Cloudflare R2 (10 GB free, zero egress) and reference CDN URLs directly.

---

## Pages

| Route              | File                    | Feature flag | Notes                                                             |
| ------------------ | ----------------------- | ------------ | ----------------------------------------------------------------- |
| `/`                | `index.astro`           | —            | Hero, topics grid, about strip — content from `site.config.ts`    |
| `/blog`            | `blog/index.astro`      | `blog`       | Listing; `?cat=life` and `?tag=travel` filters                    |
| `/blog/[slug]`     | `blog/[...slug].astro`  | `blog`       | Individual posts via BlogPost layout                              |
| `/about`           | `about.astro`           | —            | Personal narrative — edit directly                                |
| `/now`             | `now.astro`             | `nowPage`    | Living document — edit directly                                   |
| `/portfolio`       | `portfolio.astro`       | —            | Work / portfolio with scroll-snap tiles                           |
| `/projects`        | `projects/index.astro`  | `projects`   | Grid of all projects, sorted by featured + order                  |
| `/projects/[slug]` | `projects/[slug].astro` | `projects`   | Project detail: hero, overview, screenshots, stack, related posts |
| `/search`          | `search.astro`          | `search`     | Pagefind full-text search (generated at build time)               |
| `/media-kit`       | `media-kit.astro`       | `mediaKit`   | Audience stats, brand collabs, rate card — stub, TODO             |
| `/links`           | `links.astro`           | `linksPage`  | Link-in-bio hub — fully built, all sections comment/uncomment     |
| `/speaking`        | `speaking.astro`        | `speaking`   | Past talks, booking CTA — stub, TODO                              |
| `/guestbook`       | `guestbook.astro`       | `guestbook`  | Visitor messages — stub, needs backend, TODO                      |
| `/rss.xml`         | `rss.xml.js`            | `rss`        | RSS feed                                                          |

---

## Deploying

Before deploying, update the `site` URL in `astro.config.mjs`:

```js
export default defineConfig({
  site: "https://nikkapaola.com",
  // ...
});
```

Then run `npm run build` — output goes to `./dist/`.
