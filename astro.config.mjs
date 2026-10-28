import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The site's public address, used for canonical links, share cards, the sitemap and robots.txt.
// Set SITE_URL in the host's build settings when the site moves (README → Hosting).
const site = process.env.SITE_URL || 'https://uc-urbanism.netlify.app';

// v1.5 folded the Events page into Connect; v1.6 did the same with Join. Keep old links and QR codes working.
// Each entry is built as a small page that forwards instantly, so it works on any host; hosts that read
// public/_redirects (Netlify, Cloudflare) or vercel.json answer with a real 301 instead.
const redirects = {
  '/events': '/connect/#events',
  '/join': '/connect/#join',
  '/join/thanks': '/connect/#join',
};

export default defineConfig({
  site,
  redirects: Object.fromEntries(
    Object.entries(redirects).map(([from, destination]) => [from, { status: 301, destination }]),
  ),
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return !path.startsWith('/admin') && !Object.keys(redirects).some((from) => path.startsWith(from));
      },
    }),
  ],
});
