import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const link = z.object({ label: z.string(), url: z.string() });

const settings = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/settings' }),
  schema: z.object({
    site_name: z.string(),
    google_analytics_id: z.string().optional(),
    google_site_verification: z.string().optional(),
    qr_links: z.array(link.extend({ image: z.string() })),
    text_links: z.array(link),
  }),
});

// One YAML file per page. Fields differ per page, so the schema only pins the SEO
// fields every page must have and passes the rest through to the template.
const pages = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/pages' }),
  schema: z.object({ seo_title: z.string(), seo_description: z.string() }).passthrough(),
});

const leadership = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/leadership' }),
  schema: z.object({
    order: z.number(),
    role: z.string(),
    name: z.string(),
    link: z.string().url().optional(),
  }),
});

const affiliates = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/affiliates' }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      name: z.string(),
      logo: image(),
      link: z.string().url().optional(),
    }),
});

export const collections = { settings, pages, leadership, affiliates };
