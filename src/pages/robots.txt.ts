import type { APIRoute } from 'astro';

// Built from the site address in astro.config.mjs, so the sitemap line follows the site to any host.
export const GET: APIRoute = ({ site }) =>
  new Response(
    `User-agent: *
Allow: /
Disallow: /admin/

Sitemap: ${new URL('sitemap-index.xml', site).href}
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
