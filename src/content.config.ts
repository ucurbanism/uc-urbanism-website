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
    contact_email: z.string().optional(),
    qr_links: z.array(link.extend({ image: z.string() })),
    text_links: z.array(link),
  }),
});

// One YAML file per page. Fields differ per page, so the schema pins the shared SEO
// fields, types each page's known fields optionally, and passes any extra keys through.
const pages = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/pages' }),
  schema: ({ image }) =>
    z
      .object({
        seo_title: z.string(),
        seo_description: z.string(),
        // About page
        h1: z.string().optional(),
        logo_alt: z.string().optional(),
        hero_image: image().optional(),
        lede: z.string().optional(),
        cta_label: z.string().optional(),
        cta_note: z.string().optional(),
        closing_heading: z.string().optional(),
        closing_text: z.string().optional(),
        figure_park_alt: z.string().optional(),
        figure_park_caption: z.string().optional(),
        figure_walk_alt: z.string().optional(),
        figure_walk_caption: z.string().optional(),
        figure_meeting_alt: z.string().optional(),
        figure_meeting_caption: z.string().optional(),
        taglines: z.array(z.string()).optional(),
        group_photo_alt: z.string().optional(),
        intro_lines: z.string().optional(),
        about_heading: z.string().optional(),
        about_text: z.string().optional(),
        what_is_heading: z.string().optional(),
        what_is_text: z.string().optional(),
        goals_heading: z.string().optional(),
        goals: z.array(z.object({ title: z.string(), text: z.string() })).optional(),
        affiliates_heading: z.string().optional(),
        affiliates_text: z.string().optional(),
        leadership_heading: z.string().optional(),
        // Connect page
        get_connected_heading: z.string().optional(),
        get_connected_text: z.string().optional(),
        qr_note: z.string().optional(),
        join_heading: z.string().optional(),
        join_intro_text: z.string().optional(),
        signup_url: z.string().optional(),
        signup_label: z.string().optional(),
        privacy_note: z.string().optional(),
        join_fallback_text: z.string().optional(),
        events_heading: z.string().optional(),
        calendar_text: z.string().optional(),
        calendar_src: z.string().optional(),
        schedule_heading: z.string().optional(),
        schedule_text: z.string().optional(),
        schedule_embed_src: z.string().optional(),
        instagram_embed_src: z.string().optional(),
        meetings_heading: z.string().optional(),
        meetings_lines: z.string().optional(),
        meetings_address: z.string().optional(),
        meetings_photo_alt: z.string().optional(),
        // Resources page
        projects_heading: z.string().optional(),
        projects_text: z.string().optional(),
        projects_form_label: z.string().optional(),
        projects_form_url: z.string().optional(),
        projects_sheet_src: z.string().optional(),
        // 404 page
        heading: z.string().optional(),
        text: z.string().optional(),
      })
      .passthrough(),
});

const leadership = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/leadership' }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      role: z.string(),
      name: z.string(),
      link: z.string().url().optional(),
      photo: image().optional(),
    }),
});

const affiliates = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/affiliates' }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      name: z.string(),
      logo: image(),
      // Optional night-mode version. Without one, the logo is rendered solid white at night.
      logo_night: image().optional(),
      link: z.string().url().optional(),
    }),
});

export const collections = { settings, pages, leadership, affiliates };
