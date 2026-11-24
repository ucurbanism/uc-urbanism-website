import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://uc-urbanism.netlify.app',
  build: {
    // One small stylesheet (~8 KB / ~2.4 KB gzipped): inlining eliminates a render-blocking request.
    inlineStylesheets: 'always',
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        webp: { effort: 6 },
      },
    },
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin'),
    }),
  ],
});
