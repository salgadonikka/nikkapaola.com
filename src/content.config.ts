import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.optional(image()),
      /** Display category label shown on cards and the post header */
      category: z.string().optional(),
      /** Searchable tags for filtering, e.g. ["travel", "philippines", "budget"] */
      tags: z.array(z.string()).optional(),
      /** Approx reading time, e.g. "5 min read" — fill manually or generate with a remark plugin */
      readingTime: z.string().optional(),
      /** Set true to mark a post as a photo album; enables the gallery layout */
      isAlbum: z.boolean().optional(),
      /** For photo-album posts: list of image URLs or local paths */
      albumImages: z.array(z.string()).optional(),
      /** Set true to hide the post from listings and RSS; it still builds at its URL */
      draft: z.boolean().optional(),
    }),
});

export const collections = { blog };
