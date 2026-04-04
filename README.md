# nikkapaola.com

Personal blog and portfolio of Nikka Salgado, a Filipino software developer, thyroid cancer survivor, and traveler writing about life, health, code, travel, finance, and the slow work of building a life with intention.

Live at: **nikkapaola.com**

---

## Stack

- **Astro 6** — static site framework
- **React 19** — interactive components (mobile menu, photo gallery, newsletter form)
- **Tailwind CSS 4** — via `@tailwindcss/vite`; all design tokens in `src/styles/global.css`
- **MDX** — rich blog posts with embedded components
- **TypeScript** — content collection schemas and component props

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
  assets/           # images (processed by Astro's Image pipeline)
  components/
    BaseHead.astro      # <head> with SEO, fonts, global styles
    Header.astro        # site nav
    Footer.astro        # site footer
    DarkModeToggle.tsx  # light/dark toggle (React)
    MobileMenu.tsx      # hamburger nav (React)
    NewsletterForm.tsx  # email subscribe form (wire to Buttondown/ConvertKit)
    PhotoGallery.tsx    # masonry grid + lightbox for album posts (React)
    Callout.astro       # MDX callout block (note / tip / warning / aside)
    Highlight.astro     # MDX editorial pull-quote
    Figure.astro        # MDX image with optional caption
    SEO.astro           # extended Open Graph / Twitter meta
  content/
    blog/               # all posts as .md or .mdx files
    projects/           # project entries as .md or .mdx files
  layouts/
    BlogPost.astro      # layout wrapper for individual posts
  pages/
    index.astro         # homepage
    about.astro         # about page
    portfolio.astro     # portfolio / work page
    blog/
      index.astro       # blog listing with category + tag filters
      [...slug].astro   # individual post route
    projects/
      index.astro       # projects listing
      [slug].astro      # individual project detail page
    now.astro           # /now page
    apps.astro          # /apps page
    404.astro           # 404 page
    rss.xml.js          # RSS feed
  styles/
    global.css          # design tokens (@theme {}), base styles, .prose
    projects.css        # styles for /projects index + detail pages
public/
  resume.pdf
  robots.txt
  favicon.ico
```

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

| Route              | File                    | Notes                                                             |
| ------------------ | ----------------------- | ----------------------------------------------------------------- |
| `/`                | `index.astro`           | Hero, topics grid, about strip                                    |
| `/blog`            | `blog/index.astro`      | Listing; `?cat=life` and `?tag=travel` filters                    |
| `/blog/[slug]`     | `blog/[...slug].astro`  | Individual posts via BlogPost layout                              |
| `/about`           | `about.astro`           | Personal about page                                               |
| `/portfolio`       | `portfolio2.astro`      | Work / portfolio with scroll-snap tiles and drawer                |
| `/projects`        | `projects/index.astro`  | Grid of all projects, sorted by featured + order                  |
| `/projects/[slug]` | `projects/[slug].astro` | Project detail: hero, overview, screenshots, stack, related posts |
| `/now`             | `now.astro`             | What I'm doing now                                                |
| `/rss.xml`         | `rss.xml.js`            | RSS feed                                                          |

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
