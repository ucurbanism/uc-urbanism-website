# UC Urbanism Website

Website for the Urbanism Club, a University of Cincinnati Registered Student Organization.
Live at https://uc-urbanism.netlify.app (auto-deploys from the `main` branch). The build is a plain static site that
runs on any static host; see [Hosting](#hosting).

All text, photos, and embeds were carried over verbatim from the club's two prior websites:

- https://uc-urbanism.my.canva.site/
- https://geocities.ws/uc_urbanism/

Built with [Astro](https://astro.build); content is edited with [Decap CMS](https://decapcms.org).

## Pages

- `/` — About Us
- `/connect` — Get Connected (QR codes), Join the mailing list (`#join`, where the nav's Join pill goes), events
  calendar (agenda + month), Instagram, Meetings
- `/resources` — Proposals, Projects, and Plans
- `404` — branded "page not found" page, served by the host for any missing address (not in the sitemap)

`/events` was folded into `/connect` in v1.5 and `/join` in v1.6. Both, and the retired `/join/thanks/`, forward to
the matching section of `/connect` on every host (see [Redirects](#redirects)).
See [CHANGELOG.md](CHANGELOG.md) for what changed in each version.

## Editing the site (no coding needed)

Everything visible on the site lives in YAML files under `src/content/` and is editable
through the CMS at **`/admin`**:

| CMS section | What it edits | Files |
| --- | --- | --- |
| Site settings | Social/join links, QR codes, Analytics ID, Search Console token | `src/content/settings/site.yml` |
| Pages | Every heading, paragraph, and embed URL, page by page | `src/content/pages/*.yml` |
| Leadership | The Leadership Team list (one entry per person, ordered) | `src/content/leadership/*.yml` |
| Affiliate organizations | Logos and links in the Affiliates row | `src/content/affiliates/*.yml` |

Saving in the CMS commits to GitHub, which triggers a new build on the host (about a minute on Netlify).

### Editing locally (developers)

```
npm install
npm run dev     # site at http://localhost:4321
npm run cms     # in a second terminal: local CMS backend
```
Then open http://localhost:4321/admin — edits go straight to the files in your working copy.

### CMS login (one-time setup for editing on the live site)

The CMS logs editors in with GitHub, so each editor needs a GitHub account with **write access to
this repository**. GitHub sign-in needs a small login service that holds the OAuth secret. Set up one of these, once,
as a repo/site admin:

**Any host (recommended).** [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) is a free Cloudflare
Worker that works with Decap CMS and doesn't care where the site is hosted, so it survives a move.

1. Deploy it with the *Deploy to Cloudflare* button on its page (free Cloudflare account) and note its address,
   e.g. `https://sveltia-cms-auth.<account>.workers.dev`.
2. GitHub → Settings → Developer settings → OAuth Apps → *New OAuth App*. Homepage: the site's address.
   **Authorization callback URL:** `<worker address>/callback`. Copy the Client ID and generate a Client Secret.
3. In the Worker's settings, add `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (as a secret) and `ALLOWED_DOMAINS`
   (the site's hostname, e.g. `uc-urbanism.netlify.app`; add the new one when the site moves).
4. In `public/admin/config.yml`, uncomment `base_url` under `backend`, set it to the Worker's address, and commit.

**Netlify only.** Leave `base_url` unset and use Netlify's built-in login. It stops working if the site leaves Netlify.

1. GitHub → Settings → Developer settings → OAuth Apps → *New OAuth App*.
   Homepage: `https://uc-urbanism.netlify.app`. **Authorization callback URL:** `https://api.netlify.com/auth/done`.
   Copy the Client ID and generate a Client Secret.
2. Netlify → this site → *Site configuration → Access & security → OAuth → Install provider → GitHub*,
   paste the Client ID and Secret.

Either way, add each board member as a collaborator on the GitHub repo. They can then sign in at `/admin`.

## Mailing list (Google Form)

The site doesn't collect emails itself. The "Join the mailing list" section on Connect (`/connect/#join`) is a button
that opens a **club-owned Google Form**, and responses collect in that form's Google Sheet. Setup, once:

1. Create a Google Form from a shared club account (not a personal one, so it survives board turnover) with one
   required *Short answer* question, "Email", using *Response validation → Text → Email address*.
   Optionally add a name and a major question.
2. *Responses → Link to Sheets* so signups land in a spreadsheet the board can share.
3. *Send → link icon → Shorten URL*, copy the `https://forms.gle/…` link.
4. Paste it into **CMS → Pages → Connect → Join section: Google Form link**.

While that field is blank, the section says the email list is coming and shows the GroupMe button instead.
If the form is created under a uc.edu account, decide on purpose whether *Restrict to users in University of
Cincinnati* stays on: it blocks anyone without a UC login (alumni, community members).

## Search engines

- `robots.txt` and `sitemap-index.xml` are generated automatically from the site address (`SITE_URL`, see Hosting).
- To verify the site in Google Search Console, choose the *HTML tag* method and paste the token
  (the `content` value) into *Site settings → Google Search Console verification token* in the CMS.

## Hosting

`npm run build` writes a plain static site to `dist/`, and any static host can serve it. The one requirement is that
the site sits at the root of its address (`https://example.org/`, not `https://example.org/club/`).

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Output folder | `dist` |
| Node version | 22 or newer (`.node-version`; Vercel reads `engines` in `package.json`) |
| `SITE_URL` (environment variable) | The site's public address, e.g. `https://ucurbanism.org`. Used for canonical links, share cards, the sitemap and `robots.txt`. Unset, it is `https://uc-urbanism.netlify.app` (set in `astro.config.mjs`). |

| | Netlify | Cloudflare Pages | Vercel | GitHub Pages | Any other static host |
| --- | --- | --- | --- | --- | --- |
| Settings it reads | `public/_headers`, `public/_redirects` | the same two files | `vercel.json` | `.github/workflows/github-pages.yml` | none |
| Security and cache headers | yes | yes | yes | not possible | set them on the server if you can |
| Old `/events`, `/join` links | forward page (see Redirects) | real 301 | real 301 | forward page | forward page |
| 404 page | automatic | automatic | automatic | automatic | point the server's "not found" page at `/404.html` |

Netlify and Cloudflare were checked on 2026-10-28 (a Netlify draft deploy and Cloudflare's local emulator,
`npx wrangler pages dev dist`). The Vercel and GitHub Pages settings haven't been run yet.

### Setting up each host

- **Netlify** (current): nothing to do. Its dashboard holds the build command and output folder.
- **Cloudflare Pages**: create a Pages project connected to this GitHub repo, with the build command and output
  folder above, and add `SITE_URL`. Free, with no bandwidth limit.
- **Vercel**: import the repo (it detects Astro) and add `SITE_URL`. Its free plan is officially for personal,
  non-commercial projects.
- **GitHub Pages**: *Settings → Pages → Source: GitHub Actions*, add a repository variable `SITE_URL`
  (*Settings → Secrets and variables → Actions → Variables*), then *Actions → Deploy to GitHub Pages → Run workflow*.
  It needs a custom domain (without one the address is a sub-folder, `…github.io/uc-urbanism-website/`, which this
  site doesn't support), and Pages on a private repo needs a paid GitHub plan. The workflow runs only when started
  by hand, so CMS saves don't publish until you add a `push` trigger (see the comment at the top of the file).
- **Any other static host** (a university or shared web server, nginx, Apache): upload the contents of `dist/`, and
  set the server's "not found" page to `/404.html`.

### Redirects

Old addresses (`/events`, `/join`, `/join/thanks/`) are listed once in `astro.config.mjs` and built as small pages
that forward instantly to the right section of Connect, so they work on any host. `public/_redirects` (Netlify,
Cloudflare) and `vercel.json` add real 301s on top:

- Cloudflare and Vercel apply those rules before looking for files: one 301, straight to the section.
- Netlify skips a rule when a file exists at that address, so `/events` goes to `/events/` (Netlify's own 301), then
  the forward page, then the section. Visitors still land in the right place. Netlify's force suffix (`301!`) would
  restore the single 301, but Cloudflare rejects every rule that uses it.

### Moving hosts

1. Deploy to the new host and check the pages, the 404 page and an old `/events` link.
2. Set `SITE_URL` on the new host to its address (a custom domain makes later moves invisible to visitors).
3. CMS login: use the any-host login above, and add the new hostname to the Worker's `ALLOWED_DOMAINS`.
4. Google Search Console: verify the new address and submit its `sitemap-index.xml`.
5. Keep the old address working: in Netlify, stop builds from `main` and deploy a folder holding only a
   `_redirects` file with `/* https://<new address>/:splat 301!`, so old links and printed material still work.
6. Update the addresses in this README and `HANDOFF.md`.

The Instagram embed URL (CMS → Pages → Connect) contains `rd=https%3A%2F%2Fuc-urbanism.netlify.app`. That's Instagram's
referrer field; it doesn't affect the embed, so it can stay as it is.

## Checks

```
npm run build   # production build into dist/
npm test        # verifies the original club text, embeds and links are still present verbatim,
                # that the old addresses forward, and that the host files and site address are in place
```

## Structure

```
src/content/        editable content (YAML)
src/pages/          page templates (plus robots.txt.ts)
src/layouts/        shared layout (nav, head/SEO, footer, night theme)
src/assets/         photos and backgrounds (optimized at build time)
public/admin/       Decap CMS
public/media/       QR code SVGs
public/_headers     headers for Netlify and Cloudflare
public/_redirects   old-address 301s for Netlify and Cloudflare
vercel.json         the same headers and redirects for Vercel
.github/workflows/  GitHub Pages deploy (run by hand)
```
